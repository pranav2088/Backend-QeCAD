module.exports = ({ env }) => ({
    adminEmail: env('ADMIN_CONTACT_EMAIL', 'defaultadmin@domain.com'),
});
