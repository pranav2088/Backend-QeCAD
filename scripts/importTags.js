// scripts/importTags.js
import fetch from "node-fetch";

const WP_TAGS_URL = "https://www.qebimservices.com/blogs/wp-json/wp/v2/tags?per_page=100&page=4";
const STRAPI_TAGS_URL = "http://172.16.51.206:1337/api/tags";
const STRAPI_TOKEN =
    "e531d75e3ad7bc0a4cfbc4d2b00ba779688146ebb2df07a43f6aa711d30446654d2dbeccbf4a87a21cd89e4313785093e43808b75697cd3e0c914fb6110f7c6963ae3a77ca0450ca68179668121c1626d4b8c93570ff7687ec8d1005003e01fad5487c2c48aff928b55d817355e8a608a63572ccb5cfb51ef9934acd3f53447a";

async function importTags() {
    console.log("📦 Fetching WordPress tags...");
    const wpRes = await fetch(WP_TAGS_URL);
    const wpTags = await wpRes.json();

    console.log(`✅ Found ${wpTags.length} tags in WordPress.`);

    let imported = 0;

    for (const tag of wpTags) {
        const tagData = {
            data: {
                name: tag.name,
                slug: tag.slug,
                tag_id: String(tag.id),
            },
        };

        try {
            // Check if tag already exists in Strapi
            const checkRes = await fetch(`${STRAPI_TAGS_URL}?filters[tag_id][$eq]=${tag.id}`, {
                headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            });
            const existing = await checkRes.json();

            if (existing.data && existing.data.length > 0) {
                console.log(`⏩ Skipping existing tag: ${tag.name}`);
                continue;
            }

            // Create new tag
            const res = await fetch(STRAPI_TAGS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                },
                body: JSON.stringify(tagData),
            });

            if (!res.ok) {
                const errText = await res.text();
                console.warn(`⚠️ Failed to import tag "${tag.name}" — ${errText}`);
                continue;
            }

            console.log(`✅ Imported tag: ${tag.name}`);
            imported++;
        } catch (err) {
            console.error(`❌ Error importing tag "${tag.name}" —`, err);
        }
    }

    console.log(`\n✅ Tag import complete. Total imported: ${imported}`);
}

importTags();
