import fetch from "node-fetch";

const WP_BASE = "https://www.qebimservices.com/blogs/wp-json/wp/v2/categories";
const STRAPI_URL = "http://172.16.51.206:1337/api/categories";
const STRAPI_TOKEN =
    "e531d75e3ad7bc0a4cfbc4d2b00ba779688146ebb2df07a43f6aa711d30446654d2dbeccbf4a87a21cd89e4313785093e43808b75697cd3e0c914fb6110f7c6963ae3a77ca0450ca68179668121c1626d4b8c93570ff7687ec8d1005003e01fad5487c2c48aff928b55d817355e8a608a63572ccb5cfb51ef9934acd3f53447a";
async function importCategories() {
    let page = 1;
    let totalImported = 0;

    while (true) {
        const wpResponse = await fetch(`${WP_BASE}?per_page=100&page=${page}`);
        const categories = await wpResponse.json();

        if (!Array.isArray(categories) || categories.length === 0) break;

        for (const cat of categories) {
            const catData = {
                wp_id: String(cat.id),
                name: cat.name,
                slug: cat.slug,
            };

            // Check if already exists
            const check = await fetch(`${STRAPI_URL}?filters[wp_id][$eq]=${cat.id}`, {
                headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            });
            const checkData = await check.json();

            if (checkData.data.length > 0) {
                console.log(`⚠️ Skipped (duplicate): ${cat.name}`);
                continue;
            }

            // Create category
            const res = await fetch(STRAPI_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                },
                body: JSON.stringify({ data: catData }),
            });

            if (res.ok) {
                console.log(`✅ Imported: ${cat.name}`);
                totalImported++;
            } else {
                const err = await res.json();
                console.error(`❌ Failed: ${cat.name}`, err);
            }
        }

        page++;
    }

    console.log(`🎯 Import finished! Total categories imported: ${totalImported}`);
}

importCategories();
