export default ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer', // or your provider
            providerOptions: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'pranavshah.ace@gmail.com',
                    pass: 'stdm wrom layi qhag',
                },
            },
            settings: {
                defaultFrom: 'pranavshah.ace@gmail.com',
                defaultReplyTo: 'pranavshah.ace@gmail.com',
            },
        },
    },
});
