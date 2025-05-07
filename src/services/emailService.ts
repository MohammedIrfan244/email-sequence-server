import nodemailer from 'nodemailer';
import CustomError from '../lib/utils/CustomError';
import { errorLogger } from '../lib/utils/devLogger';
import dotenv from 'dotenv';

dotenv.config();

const  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const sendEmail = async (mail: string,name:string, subject: string, body: string) => {
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: mail,
            subject: subject,
            html:  `
            <div style="font-family: Arial, sans-serif;">
              <h3>Hello ${name},</h3>
              <p>${body}</p>
              <br />
              <p>Best Regards</p>
            </div>
          `,
        };
        await transporter.sendMail(mailOptions);
    }catch(error){
        console.error("Error sending email:", error);
    }
}