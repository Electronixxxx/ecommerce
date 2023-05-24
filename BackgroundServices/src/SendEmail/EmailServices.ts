import jwt from 'jsonwebtoken';
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

export const sendMail = async (mailOptions: MailOptions, purpose: string) => {
    let transporter = createTransporter(config);
    await transporter.verify();
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error Sending ${purpose} Email:`, error);
        } else {
            console.log(`${purpose} Email Sent:`, info.response);
        }
    });
};

export const sendWelcomeEmail = async (users: User[]) => {
    for (let user of users) {
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });
        ejs.renderFile(
            'Templates/welcome.ejs',
            {
                name: user.firstName,
                link: `http://localhost:8008/confirm-email/${token}`,
            },
            async (error, html) => {
                if (error) {
                    return error;
                } else {
                    try {
                        const message = {
                            from: process.env.EMAIL as string,
                            to: user.email as string,
                            subject: 'Welcome to our Site',
                            html,
                        };
                        await sendMail(message, "Welcome");
                        await DatabaseHelper.query(
                            `UPDATE Users SET emailSent ='1' WHERE id ='${user.id}'`
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        );
    }
};

export const sendPasswordResetEmail = async (users: User[]) => {
    for (let user of users) {
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });
        ejs.renderFile(
            'Templates/reset.ejs',
            {
                name: user.firstName,
                resetLink: `http://localhost:8008/reset-password/${token}`,
            },
            async (error, html) => {
                if (error) {
                    return error;
                } else {
                    try {
                        const message = {
                            from: process.env.EMAIL as string,
                            to: user.email as string,
                            subject: 'You requested a password reset',
                            html,
                        };
                        await sendMail(message, "Password Reset");
                        await DatabaseHelper.query(
                            `UPDATE Users SET passwordResetRequested=0 WHERE id ='${user.id}'`
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        );
    }
};
