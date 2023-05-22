import express from 'express';
import cron from 'node-cron';
import { sendPasswordResetEmail, sendWelcomeEmail } from './SendEmail/EmailServices';
import { DatabaseHelper } from './DatabaseHelper';
import { User } from './Interfaces';
import { emailRoute, passwordRoute } from './routes/routes';

const app = express();
app.use('/confirm-email', emailRoute)
app.use('/reset-password', passwordRoute)

cron.schedule('*/15 * * * * *', async () => {
    console.log('Watching DB 👀');
    const newUsers: User[] = (
        await DatabaseHelper.query(`SELECT * FROM Users WHERE emailSent=0
  `)
    ).recordset;
    sendWelcomeEmail(newUsers);

    const resetPasswordRequests: User[] = (
        await DatabaseHelper.query(`SELECT * FROM Users WHERE passwordResetRequested=1
  `)
    ).recordset;
    sendPasswordResetEmail(resetPasswordRequests);
});

app.listen(4002, () => {
    console.log('App is Running');
});
