import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';

// 🔧 Конфігурація SMTP-транспорту для Brevo (Sendinblue)
const transport = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),                         // smtp-relay.brevo.com
  port: Number(getEnvVar('SMTP_PORT')),                 // 587
  secure: false,                                        // STARTTLS (тобто не SSL)
  auth: {
    user: getEnvVar('SMTP_USER'),                       // Email з акаунту Brevo
    pass: getEnvVar('SMTP_PASSWORD'),                   // SMTP ключ з Brevo
  },
});

// 📩 Універсальна функція надсилання листа
export const sendMail = async ({ to, subject, html }) => {
  const from = getEnvVar('SMTP_FROM'); // підтверджений email-адрес відправника

  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  try {
    const result = await transport.sendMail(mailOptions);
    console.log('✅ Email successfully sent:', result.messageId);
    return result;
  } catch (error) {
    // 🛠️ Логування повної інформації про помилку
    console.error('❌ Email sending failed!');
    console.error('🔎 Error message:', error.message);
    console.error('📩 SMTP code:', error.code);
    console.error('📡 SMTP response:', error.response);
    console.error('🧩 Full error object:', error);
    throw new Error('Failed to send the email, please try again later.');
  }
};
