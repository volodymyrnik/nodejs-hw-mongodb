import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';

const transport = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: getEnvVar('SMTP_PORT'),
  secure: false,
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASSWORD'),
  },
});

export const sendMail = async (mail) => {
  return transport.sendMail(mail);
};