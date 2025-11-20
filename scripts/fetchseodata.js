import fs from "fs";
import fetch from "node-fetch";

const WP_API =
  "https://www.qebimservices.com/blogs/wp-json/wp/v2/posts?per_page=50&page=4&_embed";
const STRAPI_API = "http://172.16.51.206:1337/api/seo-pages"; // your Strapi URL
const STRAPI_TOKEN = "abbd662ac0d50fffb4f66051bed0ec21e4caf945c74dac06db68b2c564dea441fe4b95ec73ab8cc52a1f20f843f9a2dd85bebc2b89f8a8f9daa24f61ba3f3bad883e0718cb0345fef11fc03b4c9fb044f732182699edc32607db308ab3e839e472e94de5868d5752985448fde6450ef0fe4b1a95cc4bd7abe33f66799e18c87b";

console.log("🚀 Fetching SEO data from WordPress...");

const res = await fetch(WP_API);
const posts = await res.json();

const seoData = posts.map((post) => {
  const yoast = post.yoast_head_json || {};

  return {
    title: yoast.title || post.title?.rendered || "",
    slug: post.slug,
    SeoData: {
      metaTitle: yoast.title || "",
      metaDescription: yoast.description || "",
      canonicalURL: yoast.canonical || "",
      schemaMarkup: yoast.schema || {},
      ogTags: `
**OG Locale:** ${yoast.og_locale || "en_US"}
**OG Type:** ${yoast.og_type || "article"}
**OG Title:** ${yoast.og_title || ""}
**OG Description:** ${yoast.og_description || ""}
**OG URL:** ${yoast.og_url || ""}
**OG Site Name:** ${yoast.og_site_name || ""}
**Article Publisher:** ${yoast.article_publisher || ""}
**Article Published Time:** ${yoast.article_published_time || ""}
**Article Modified Time:** ${yoast.article_modified_time || ""}
**Author:** ${yoast.author || ""}
**OG Image URL:** ${yoast.og_image?.[0]?.url || ""}
**OG Image Type:** ${yoast.og_image?.[0]?.type || ""}
**OG Image Width:** ${yoast.og_image?.[0]?.width || ""}
**OG Image Height:** ${yoast.og_image?.[0]?.height || ""}
      `,
      twitterTags: `
**Twitter Card:** ${yoast.twitter_card || ""}
**Twitter Creator:** ${yoast.twitter_creator || ""}
**Twitter Site:** ${yoast.twitter_site || ""}
**Written By:** ${yoast.twitter_misc?.["Written by"] || ""}
**Estimated Reading Time:** ${yoast.twitter_misc?.["Est. reading time"] || ""}
      `,
    },
  };
});

fs.writeFileSync("scripts/seo-data.json", JSON.stringify(seoData, null, 2));
console.log(`✅ Fetched ${seoData.length} SEO entries from WordPress.`);

// Now upload to Strapi
console.log("🚀 Uploading data to Strapi...");

for (const item of seoData) {
  const res = await fetch(STRAPI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: item }),
  });

  if (res.ok) {
    const json = await res.json();
    console.log(`✅ Added: ${item.slug}`);
  } else {
    const error = await res.text();
    console.error(`❌ Failed for ${item.slug}`, error);
  }
}

console.log("🎉 All data imported to Strapi!");
