import { factories } from "@strapi/strapi";
import fs from "fs";
import { getThankYouEmailTemplate } from "../../../../email-templates/emailTemplates";

import juice from 'juice';

export default factories.createCoreController(
    "api::form-submission.form-submission",
    ({ strapi }) => ({
        async send(ctx) {
            try {
                const { body, files } = ctx.request;

                if (!body) return ctx.badRequest("Missing form data");

                console.log("📂 Incoming Files:", files);

                let uploadedFileIds: number[] = [];
                let uploadedFileUrls: string[] = [];
                let attachments: any[] = [];

                // -------------------------------------------------------
                // 1️⃣ Handle File Upload + Prepare Attachments for Email
                // -------------------------------------------------------
                if (files && files.file) {
                    const fileArray = Array.isArray(files.file)
                        ? files.file
                        : [files.file];

                    for (const file of fileArray) {
                        // Upload to Strapi Upload plugin
                        const uploadResult = await strapi
                            .plugin("upload")
                            .service("upload")
                            .upload({
                                data: {},
                                files: file,
                            });

                        if (uploadResult?.[0]) {
                            const uploaded = uploadResult[0];

                            uploadedFileIds.push(uploaded.id);
                            uploadedFileUrls.push(uploaded.url);

                            // Attach file to email (read from temp folder)
                            attachments.push({
                                filename: file.originalFilename,
                                content: fs.readFileSync(file.filepath),
                                contentType: file.mimetype,
                            });
                        }
                    }
                }

                // -------------------------------------------------------
                // 2️⃣ Save Entry in Database
                // -------------------------------------------------------
                const entry = await strapi.entityService.create(
                    "api::form-submission.form-submission",
                    {
                        data: {
                            ...body,
                            file: uploadedFileIds,
                        },
                    }
                );

                // -------------------------------------------------------
                // 3️⃣ Email to User
                // -------------------------------------------------------
                const htmlTemplate = getThankYouEmailTemplate(body.name, body.email);
                const inlinedHtml = juice(htmlTemplate);

                await strapi.plugin('email').service('email').send({
                    to: body.email,
                    subject: 'Thank You',
                    html: inlinedHtml,
                });
                // -------------------------------------------------------
                // 4️⃣ Email to Admin (with attachments)
                // -------------------------------------------------------

                await strapi.plugin("email").service("email").send({
                    to: "pranavshah.ace@gmail.com",
                    subject: "New Contact Form Submission",
                    html: `
                        <h2>📩 New Form Submission</h2>
                        <p><strong>Name:</strong> ${body.name}</p>
                        <p><strong>Email:</strong> ${body.email}</p>
                        <p><strong>Phone:</strong> ${body.phone}</p>
                        <p><strong>Document Type:</strong> ${body.document}</p>
                        <p><strong>Message:</strong> ${body.description}</p>

                        <p><strong>Entry ID:</strong> ${entry.id}</p>
                    `,
                    attachments, // Attach PDF/Images/Docx
                });

                // -------------------------------------------------------
                // 5️⃣ Final Response
                // -------------------------------------------------------
                return {
                    message:
                        "Thank you! Your form has been submitted successfully",
                    entryId: entry.id,
                };
            } catch (error) {
                console.error("❌ Error processing form submission:", error);
                ctx.throw(500, "Internal server error");
            }
        },
    })
);
