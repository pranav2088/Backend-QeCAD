// importBlogsFull.js
import axios from "axios";
import FormData from "form-data";
import fetch from "node-fetch";

// ---------- CONFIG ----------
const WP_API = "https://www.qebimservices.com/blogs/wp-json/wp/v2/posts";
const STRAPI_URL = "http://172.16.51.206:1337";
const STRAPI_TOKEN =
    "07219f06db34b93cd70b91163af679807dd920fe727e0e3abe8eb51d22fbfd8e84b6e27905c380b04b4d92955f8fe5d95bf1647226576925b88e94ea19f578c29d82b0710dda624b1fc4dd21cf89d3b6c124c678f991dccb6c1a64e84a61ca69f6d4c1531b6f611337c0cdcbcc06717dc1f843503f67befbac136cb7703e2809"; // ⚠️ replace with valid token

const BLOG_URL = `${STRAPI_URL}/api/blogs-details`;
const STRAPI_TAGS_URL = `${STRAPI_URL}/api/tags`;
const STRAPI_CATEGORIES_URL = `${STRAPI_URL}/api/categories`;

// ---------- STATIC SOCIAL MEDIA LINKS ----------
const SOCIAL_MEDIA_LINKS = [
    {
        text: "Facebook",
        svg_code: `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66634 10.2552H8.74967L9.58301 6.92188H6.66634V5.25521C6.66634 4.39739 6.66634 3.58854 8.33301 3.58854H9.58301V0.788625C9.31159 0.752583 8.28551 0.671875 7.20209 0.671875C4.94001 0.671875 3.33301 2.05259 3.33301 4.5883V6.92188H0.833008V10.2552H3.33301V17.3385H6.66634V10.2552Z" fill="currentColor" />
    </svg>`,
        url: "https://www.facebook.com/people/Qebim/100093318901204/",
    },
    {
        text: "LinkedIn",
        svg_code: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.78357 2.16742C3.78326 2.84601 3.37157 3.45666 2.74262 3.71142C2.11367 3.96619 1.39306 3.81419 0.920587 3.32711C0.448112 2.84001 0.318129 2.11511 0.59192 1.49421C0.86572 0.873305 1.48862 0.480397 2.1669 0.500755C3.0678 0.527797 3.78398 1.26612 3.78357 2.16742ZM3.83357 5.06742H0.500237V15.5007H3.83357V5.06742ZM9.10025 5.06742H5.78357V15.5007H9.06692V10.0257C9.06692 6.97573 13.0419 6.6924 13.0419 10.0257V15.5007H16.3336V8.8924C16.3336 3.75075 10.4503 3.94242 9.06692 6.4674L9.10025 5.06742Z" fill="currentColor" />
    </svg>`,
        url: "https://www.linkedin.com/showcase/qebim/",
    },
    {
        text: "Instagram",
        svg_code: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.85724 0.671875C10.7951 0.673425 11.2703 0.678392 11.681 0.690617L11.8427 0.6959C12.0296 0.702542 12.2139 0.710875 12.4362 0.721292C13.3229 0.762267 13.9278 0.902542 14.4591 1.10879C15.0083 1.3206 15.4722 1.60671 15.9354 2.06991C16.3979 2.5331 16.6841 2.99837 16.8966 3.54629C17.1021 4.07685 17.2424 4.68241 17.2841 5.56921C17.294 5.79143 17.302 5.97577 17.3086 6.16263L17.3138 6.32437C17.326 6.73499 17.3316 7.21032 17.3333 8.14818L17.334 8.76952C17.3341 8.84543 17.3341 8.92377 17.3341 9.0046L17.334 9.23968L17.3335 9.8611C17.3319 10.7989 17.327 11.2743 17.3147 11.6848L17.3094 11.8466C17.3028 12.0335 17.2945 12.2178 17.2841 12.44C17.2431 13.3268 17.1021 13.9317 16.8966 14.4629C16.6847 15.0123 16.3979 15.4762 15.9354 15.9393C15.4722 16.4018 15.0062 16.6879 14.4591 16.9004C13.9278 17.106 13.3229 17.2463 12.4362 17.2879C12.2139 17.2978 12.0296 17.3059 11.8427 17.3124L11.681 17.3177C11.2703 17.3299 10.7951 17.3354 9.85724 17.3373L9.23582 17.3379C9.1599 17.3379 9.08157 17.3379 9.00074 17.3379H8.76565L8.14424 17.3373C7.2064 17.3358 6.73109 17.3309 6.32046 17.3186L6.15873 17.3134C5.97185 17.3067 5.78752 17.2983 5.5653 17.2879C4.67849 17.247 4.07433 17.106 3.54239 16.9004C2.99377 16.6887 2.52919 16.4018 2.06599 15.9393C1.6028 15.4762 1.31739 15.0102 1.10489 14.4629C0.898636 13.9317 0.759052 13.3268 0.717386 12.44C0.707486 12.2178 0.69941 12.0335 0.692869 11.8466L0.687627 11.6848C0.675435 11.2743 0.669877 10.7989 0.668077 9.8611L0.667969 8.14818C0.669519 7.21032 0.674477 6.73499 0.686702 6.32437L0.691994 6.16263C0.698635 5.97577 0.706969 5.79143 0.717386 5.56921C0.758352 4.68171 0.898636 4.07754 1.10489 3.54629C1.31669 2.99768 1.6028 2.5331 2.06599 2.06991C2.52919 1.60671 2.99447 1.32129 3.54239 1.10879C4.07364 0.902542 4.6778 0.762958 5.5653 0.721292C5.78752 0.7114 5.97185 0.703325 6.15873 0.696783L6.32046 0.691542C6.73109 0.679342 7.2064 0.673783 8.14424 0.671983L9.85724 0.671875ZM9.00074 4.83796C6.6983 4.83796 4.83405 6.70423 4.83405 9.0046C4.83405 11.307 6.70033 13.1713 9.00074 13.1713C11.3032 13.1713 13.1674 11.305 13.1674 9.0046C13.1674 6.70221 11.3011 4.83796 9.00074 4.83796ZM9.00074 6.50462C10.3815 6.50462 11.5007 7.62352 11.5007 9.0046C11.5007 10.3853 10.3818 11.5046 9.00074 11.5046C7.61999 11.5046 6.50072 10.3858 6.50072 9.0046C6.50072 7.62385 7.61957 6.50462 9.00074 6.50462ZM13.3757 3.58796C12.8013 3.58796 12.3341 4.05455 12.3341 4.62892C12.3341 5.20329 12.8007 5.6706 13.3757 5.6706C13.9501 5.6706 14.4174 5.20402 14.4174 4.62892C14.4174 4.05455 13.9493 3.58724 13.3757 3.58796Z" fill="currentColor" />
    </svg>`,
        url: "https://www.instagram.com/qecad3d/",
    },
    {
        text: "Twitter (X)",
        svg_code: `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5104 1.71289C16.8743 1.9943 16.1996 2.17914 15.5088 2.26127C16.2366 1.82561 16.7812 1.14026 17.0411 0.332886C16.3573 0.739186 15.6088 1.02515 14.8282 1.17835C14.1693 0.475394 13.2483 0.0770356 12.2848 0.0781272C10.3605 0.0781272 8.79975 1.63835 8.79975 3.56354C8.79975 3.83666 8.83109 4.10153 8.88967 4.35709C5.99206 4.21121 3.42506 2.82455 1.70565 0.715686C1.39608 1.24757 1.23338 1.85216 1.2342 2.46757C1.2342 3.67667 1.84967 4.74388 2.78458 5.36868C2.23115 5.35118 1.6899 5.20171 1.20599 4.93262C1.20545 4.94726 1.20545 4.9619 1.20545 4.97574C1.20545 6.66484 2.40683 8.07384 4.00166 8.39376C3.70234 8.47476 3.3936 8.51568 3.08352 8.51543C2.85831 8.51543 2.63976 8.49468 2.42733 8.45393C2.8711 9.83826 4.15739 10.8461 5.683 10.8738C4.44845 11.8427 2.92391 12.3683 1.35453 12.3661C1.07677 12.3663 0.799246 12.3499 0.523438 12.3171C2.1167 13.3413 3.97127 13.8849 5.86535 13.8829C12.2763 13.8829 15.7817 8.57243 15.7817 3.9671C15.7817 3.81643 15.778 3.66523 15.7713 3.51615C16.4536 3.02322 17.0425 2.41257 17.5104 1.71289Z" fill="currentColor" />
    </svg>`,
        url: "https://x.com/qecad3d?lang=en",
    },
];


// ---------- HELPERS ----------
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

// ---------- FETCHERS ----------

async function fetchAllTagsFromStrapi() {
    const allTags = [];
    const pageSize = 100;
    const maxPages = 10; // fetch up to 10 pages

    for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(
            `${STRAPI_TAGS_URL}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            {
                headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error(`Failed to fetch tags from page ${page}:`, result);
            break;
        }

        const data = result?.data || [];
        if (data.length === 0) {
            console.log(`No more tags found after page ${page - 1}.`);
            break;
        }

        for (const tag of data) {

            allTags.push({
                id: tag.id,
                name: tag.name || "",
                tag_id: tag.tag_id || null,
            });
        }

        console.log(`✅ Page ${page}: fetched ${data.length} tags.`);
    }

    console.log(`\n✅ Total tags fetched: ${allTags.length}`);
    return allTags;
}

async function fetchAllCategoriesFromStrapi() {
    const allCategory = [];
    const pageSize = 100;
    const maxPages = 10; // fetch up to 10 pages

    for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(
            `${STRAPI_CATEGORIES_URL}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            {
                headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error(`Failed to fetch Category from page ${page}:`, result);
            break;
        }

        const data = result?.data || [];
        if (data.length === 0) {
            console.log(`No more Category found after page ${page - 1}.`);
            break;
        }

        for (const category of data) {

            allCategory.push({
                id: category.id,
                name: category.name || "",
                wp_id: category.wp_id || null,
            });
        }

        console.log(`✅ Page ${page}: fetched ${data.length} tags.`);
    }

    console.log(`\n✅ Total tags fetched: ${allCategory.length}`);
    return allCategory;
}


async function fetchAllFromWP(perPage = 100) {
    let allPosts = [];
    let page = 1;

    console.log("🌐 Fetching posts from WordPress...");

    while (true) {
        console.log(`📄 Fetching WordPress posts (page ${page})...`);
        const res = await fetch(`${WP_API}?per_page=${perPage}&page=${page}&_embed`);

        if (!res.ok) {
            console.warn(`⚠️ Failed to fetch page ${page}: ${res.statusText}`);
            break;
        }

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) break;

        allPosts = allPosts.concat(data);
        console.log(`✅ Page ${page}: fetched ${data.length} posts.`);

        // Stop when fewer than perPage items are returned (means last page)
        if (data.length < perPage) break;

        page++;
        await delay(1000); // avoid overloading WP
    }

    console.log(`✅ Total fetched ${allPosts.length} posts from WordPress.`);
    return allPosts;
}


// ---------- STRAPI BLOG CREATION ----------
async function createOrUpdateBlog(post, strapiTags, strapiCats) {
    try {
        // Map tags
        const matchedTags = strapiTags.filter((t) =>
            post.tags.map(String).includes(String(t.tag_id))
        );
        const matchedCats = strapiCats.filter((c) =>
            post.categories.map(String).includes(String(c.wp_id))
        );

        const imageUrl = post.yoast_head_json?.og_image?.[0]?.url;
        const uploadedImg = await uploadImageFromUrl(imageUrl);
        const yoast = post.yoast_head_json || {};
        const payload = {
            title: post.title.rendered,
            slug: post.slug,
            content: post.content.rendered,
            wp_id: String(post.id),
            featuredImage: uploadedImg ? uploadedImg.id : null,
            tags: {
                connect: matchedTags.map((t) => ({ id: t.id })),
            },
            categories: {
                connect: matchedCats.map((c) => ({ id: c.id })),
            },
            seo: {
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
            author_name: post?.yoast_head_json?.author || post?.yoast_head_json?.twitter_misc?.["Written by"] || "Admin",
            social_media: SOCIAL_MEDIA_LINKS.map((item) => ({ text: item.text, svg_code: item.svg_code, url: item.url, })),
        };

        // Check if already exists
        const checkRes = await fetch(
            `${BLOG_URL}?filters[wp_id][$eq]=${post.id}`,
            {
                headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
            }
        );
        const existing = await checkRes.json();

        if (existing?.data?.length > 0) {
            const existingId = existing.data[0].id;
            console.log(`🔄 Updating blog: ${post.slug}`);
            await fetch(`${BLOG_URL}/${existingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                },
                body: JSON.stringify({ data: payload }),
            });
        } else {
            console.log(`➕ Creating new blog: ${post.slug}`);
            await fetch(BLOG_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                },
                body: JSON.stringify({ data: payload }),
            });
        }

        console.log(`✅ Synced: ${post.slug}`);
    } catch (err) {
        console.error(`❌ Failed to sync ${post.slug}:`, err.message);
    }
}

// ---------- MAIN ----------
async function importBlogs() {
    console.log("📂 Fetching Strapi tags and categories...");
    const [strapiTags, strapiCats] = await Promise.all([
        fetchAllTagsFromStrapi(),
        fetchAllCategoriesFromStrapi(),
    ]);
    console.log(`✅ Tags: ${strapiTags.length}, Categories: ${strapiCats.length}`);

    console.log("\n📄 Fetching WordPress posts...");
    const posts = await fetchAllFromWP(); // 👈 All blogs for test
    //const posts = (await fetchAllFromWP()).slice(0, 2); // Import only first 2 blogs
    for (const post of posts) {
        await createOrUpdateBlog(post, strapiTags, strapiCats);
        await delay(1000); // small delay to avoid API flooding
    }

    console.log("\n🎉 Finished importing and uploading blogs!");
}

importBlogs();

