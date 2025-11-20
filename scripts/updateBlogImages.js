import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import FormData from "form-data";

const WP_BASE = "https://www.qebimservices.com/blogs/wp-json/wp/v2/posts";
const STRAPI_URL = "http://172.16.51.206:1337/api/dummy-blogs";
const STRAPI_UPLOAD = "http://172.16.51.206:1337/api/upload";
const STRAPI_TOKEN =
    "da4bf1e5503304e2738a81c68f3489bec9cc645e0119d78c72420d47ba7b25f43a60a7437fe508be09b116533b103c56d6b60fbcdefe20db49d45f1c25efc5faaa0b30c4f508e726b40fdb2c09b0ccc30e150083807242e65f3455da70e164f249e6bf9e3e682a4b861d352edb5bcdc6bfb406c8d2b69af11f7ea74c7ee49172";

async function updateBlogImages() {
    const wpResponse = await fetch(`${WP_BASE}?per_page=2&_embed`);
    const posts = await wpResponse.json();

    for (const post of posts) {
        const wpId = String(post.id);
        console.log(`\n🔍 Checking blog with wp_id: ${wpId}`);

        // find blog in Strapi by wp_id (string comparison)
        const check = await fetch(`${STRAPI_URL}?filters[wp_id][$eq]=${wpId}`, {
            headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        });
        const checkData = await check.json();

        if (!checkData.data || checkData.data.length === 0) {
            console.log(`❌ Blog not found in Strapi for wp_id ${wpId}`);
            continue;
        }

        const blogId = checkData.data[0].id;

        // get featured media URL from WP
        const media =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
        if (!media) {
            console.log(`⚠️ No image found for ${post.title.rendered}`);
            continue;
        }

        console.log(`🖼️ Downloading image from: ${media}`);

        const imageResponse = await fetch(media);
        const buffer = await imageResponse.arrayBuffer();

        // create temp file
        const filePath = path.join(process.cwd(), "temp.jpg");
        fs.writeFileSync(filePath, Buffer.from(buffer));

        const formData = new FormData();
        formData.append("files", fs.createReadStream(filePath));
        formData.append("ref", "api::dummy-blog.dummy-blog");
        formData.append("refId", blogId);
        formData.append("field", "featuredImage");

        const upload = await fetch(STRAPI_UPLOAD, {
            method: "POST",
            headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            body: formData,
        });

        if (upload.ok) {
            console.log(`✅ Image uploaded and linked for: ${post.title.rendered}`);
        } else {
            const err = await upload.text();
            console.log(`❌ Upload failed for ${post.title.rendered}:`, err);
        }

        fs.unlinkSync(filePath); // cleanup
    }

    console.log("\n🎯 Test finished for first 2 blogs.");
}

updateBlogImages();
