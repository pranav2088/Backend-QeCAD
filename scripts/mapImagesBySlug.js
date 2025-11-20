// scripts/mapImagesBySlug.js
import fetch from "node-fetch";

const STRAPI_URL = "http://172.16.51.206:1337";
const STRAPI_TOKEN =
    "da4bf1e5503304e2738a81c68f3489bec9cc645e0119d78c72420d47ba7b25f43a60a7437fe508be09b116533b103c56d6b60fbcdefe20db49d45f1c25efc5faaa0b30c4f508e726b40fdb2c09b0ccc30e150083807242e65f3455da70e164f249e6bf9e3e682a4b861d352edb5bcdc6bfb406c8d2b69af11f7ea74c7ee49172";

// -------------------------------
// ✅ Fetch all Strapi media files
// -------------------------------
async function fetchMedia() {
    const res = await fetch(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=500`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    });

    if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid media data format");
    return data;
}

// -------------------------------
// ✅ Fetch all dummy blogs
// -------------------------------
async function fetchBlogs() {
    const res = await fetch(`${STRAPI_URL}/api/dummy-blogs?pagination[pageSize]=500`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    });
    console.log("RES DUMMY IAMGE", res)
    if (!res.ok) throw new Error(`Blogs fetch failed: ${res.status}`);
    const data = await res.json();
    if (!data?.data) throw new Error("Invalid blog data format");

    return data.data.map((item) => ({
        id: item.id,
        slug: item?.slug || item.slug,
    }));
}

// -------------------------------
// ✅ Update blog featured image
// -------------------------------
async function updateBlogImage(blogId, imageId, slug) {
    console.log(`🆔 Trying to update blog id=${blogId} slug="${slug}"`);

    const res = await fetch(`${STRAPI_URL}/api/dummy-blogs/${blogId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({ data: { featuredImage: imageId } }),
    });

    const text = await res.text();

    if (res.ok) {
        console.log(`✅ Updated "${slug}" with image ID ${imageId}`);
    } else {
        console.warn(`❌ Failed to update "${slug}" [${res.status}]: ${text}`);
    }
}


// -------------------------------
// 🚀 Run script for testing (2–3 only)
// -------------------------------
async function run() {
    try {
        console.log("📸 Fetching media...");
        const media = await fetchMedia();

        console.log("📰 Fetching blogs...");
        const blogs = await fetchBlogs();

        console.log(`🔗 Matching ${media.length} images to ${blogs.length} blogs...`);

        let matchCount = 0;
        for (const blog of blogs) {
            const matched = media.find((m) =>
                m.name.toLowerCase().includes(blog.slug.toLowerCase())
            );

            if (matched) {
                await updateBlogImage(blog.id, matched.id, blog.slug);
                matchCount++;
            } else {
                console.log(`⚠️ No image found for slug: ${blog.slug}`);
            }

            // Stop after 3 successful updates for testing
            if (matchCount >= 3) break;
        }

        console.log(`🎯 Done — updated ${matchCount} blog(s).`);
    } catch (err) {
        console.error("❌ Script error:", err);
    }
}

run();
