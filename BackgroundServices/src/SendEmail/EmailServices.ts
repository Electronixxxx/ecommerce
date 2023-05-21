import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { DatabaseHelper } from '../DatabaseHelper';
import ejs from 'ejs';
import { User, MailConfig, MailOptions } from '../Interfaces';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


let config: MailConfig = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PWD as string,
    },
};

const createTransporter = (config: MailConfig) => {
    return nodemailer.createTransport(config);
};

export const sendMail = async (mailOptions: MailOptions) => {
    let transporter = createTransporter(config);
    await transporter.verify();
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending welcome email:', error);
        } else {
            console.log('Welcome email sent:', info.response);
        }
    });
};

export const sendWelcomeEmail = async (users: User[]) => {
    for (let user of users) {
        ejs.renderFile(
            'Templates/welcome.ejs',
            { name: user.firstName },
            async (error, html) => {
                if (error) {
                    return (error)
                } else {
                    try {
                        const message = {
                            from: process.env.EMAIL as string,
                            to: user.email as string,
                            subject: 'Welcome to our Site',
                            html
                        };
                        await sendMail(message);
                        await DatabaseHelper.query(
                            `UPDATE User SET emailSent ='1' WHERE id ='${user.id}'`
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        );
    }
};

export const sendPasswordResetEmail = async () => {};
