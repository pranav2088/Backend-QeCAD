/**
 * form-submission router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::form-submission.form-submission');
export default {
    routes: [
        {
            method: "POST",
            path: "/form-submissions/send",
            handler: "form-submission.send",
            config: {
                auth: false,
            },
        },
    ],
};
