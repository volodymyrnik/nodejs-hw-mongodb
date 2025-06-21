import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';

// Ініціалізація SMTP-транспорту
const transport = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),               // smtp-relay.brevo.com
  port: Number(getEnvVar('SMTP_PORT')),       // 587
  secure: false,                              // Brevo працює на STARTTLS, тому false
  auth: {
    user: getEnvVar('SMTP_USER'),             // твій email у Brevo
    pass: getEnvVar('SMTP_PASSWORD'),         // згенерований SMTP ключ
  },
});

// Основна функція надсилання
export const sendMail = async ({ to, subject, html }) => {
  try {
    const from = getEnvVar('SMTP_FROM'); // перевірений email відправника
    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const result = await transport.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('📄 Full error object:', error);
    throw new Error('Failed to send the email, please try again later.');
  }
};
