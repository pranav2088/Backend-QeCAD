import fs from 'fs';
import path from 'path';

// Function to load a template and replace placeholders
export const getThankYouEmailTemplate = (name: string, senderName: string) => {
    const templatePath = path.join(process.cwd(), 'email-templates', 'thank-you.html');

    console.log('Template Path:', templatePath); // ✅ Debug
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace(/{{name}}/g, name).replace(/{{senderName}}/g, senderName);
    return html;
};
