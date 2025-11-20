import axios from "axios";
import FormData from "form-data";

const STRAPI_URL = "http://172.16.51.206:1337";
const STRAPI_TOKEN =
    "07219f06db34b93cd70b91163af679807dd920fe727e0e3abe8eb51d22fbfd8e84b6e27905c380b04b4d92955f8fe5d95bf1647226576925b88e94ea19f578c29d82b0710dda624b1fc4dd21cf89d3b6c124c678f991dccb6c1a64e84a61ca69f6d4c1531b6f611337c0cdcbcc06717dc1f843503f67befbac136cb7703e2809";

async function uploadImageFromUrl(imageUrl) {
    if (!imageUrl) return null;

    try {
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const formData = new FormData();
        formData.append("files", response.data, {
            filename: imageUrl.split("/").pop(),
            contentType: response.headers["content-type"],
        });

        const uploadRes = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
                ...formData.getHeaders(),
            },
        });

        console.log(`🖼️ Uploaded image: ${imageUrl}`);
        return uploadRes.data[0];
    } catch (err) {
        console.error("❌ Image upload failed:", imageUrl);
        if (err.response) {
            console.error("🔍 Status:", err.response.status);
            console.error("🔍 Data:", err.response.data);
        } else {
            console.error("🔍 Error:", err.message);
        }
        return null;
    }
}

async function createBlog(post) {
    try {
        const imgData = await uploadImageFromUrl(post.imageUrl);

        const res = await axios.post(
            `${STRAPI_URL}/api/dummy-blogs`,
            {
                data: {
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    featuredImage: imgData ? imgData.id : null, // adjust if your Strapi field name differs
                },
            },
            {
                headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            }
        );

        console.log(`✅ Added: ${post.slug}`);
    } catch (err) {
        console.error(`❌ Failed to add ${post.slug}:`);
        if (err.response) {
            console.error("🔍 Status:", err.response.status);
            console.error("🔍 Data:", err.response.data);
        } else {
            console.error("🔍 Error:", err.message);
        }
    }
}

async function importBlogs() {
    try {
        const wpRes = await axios.get(
            "https://www.qebimservices.com/blogs/wp-json/wp/v2/posts?per_page=100"
        );
        const posts = wpRes.data.slice(0, 2); // 👈 only first 2 blogs

        for (const post of posts) {
            const imageUrl = post.yoast_head_json?.og_image?.[0]?.url;
            await createBlog({
                title: post.title.rendered,
                slug: post.slug,
                content: post.content.rendered,
                imageUrl,
            });
        }

        console.log("✅ Finished importing 2 blogs.");
    } catch (err) {
        console.error("❌ Failed to import blogs:", err.message);
    }
}

importBlogs();
