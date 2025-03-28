import nodemailer from 'nodemailer';
import { Context } from 'hono';

// import { json } from 'stream/consumers';
// import { error } from 'console';

export const sendEmail = async (email: string, subject: string, text: string): Promise<string> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      text: text,
      subject: subject,
      html: `<p>${text}</p>`,
    };

    const mailRes: nodemailer.SentMessageInfo = await transporter.sendMail(mailOptions);
    let res = '';
    if (mailRes.accepted.length > 0) {
      res = 'Email sent successfully';
    } else if (mailRes.rejected.length > 0) {
      res = 'Email not sent, please try again';
    } else {
      res = 'Internal server error, please try again later';
    }
    return res;
  } catch (error: any) {
    console.log(error);
    return `Error: ${error.message}`;
  }
};

export const sendRegistrationEmail = async (email: string, eventName: string): Promise<string> => {
  try {
    const subject: string = `Registration confirmation for ${eventName}`;
    const message: string = `Hello, you have successfully registered for ${eventName}`;
    const emailResponse: string = await sendEmail(email, subject, message);
    return emailResponse;
  } catch (error: any) {
    console.log(error?.message);
    throw error;
  }
};
