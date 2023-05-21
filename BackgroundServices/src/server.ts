import express from 'express';
import cron from 'node-cron';
import { sendWelcomeEmail } from './SendEmail/EmailServices';
import { DatabaseHelper } from './DatabaseHelper';
import { User } from './Interfaces';

const app = express();

cron.schedule('*/15 * * * * *', async () => {
    console.log('Watching DB 👀');
    const users: User[] = (
        await DatabaseHelper.query(`SELECT * FROM Users WHERE emailSent=0
  `)
    ).recordset;
    sendWelcomeEmail(users);
});

app.listen(4002, () => {
    console.log('App is Running');
});
