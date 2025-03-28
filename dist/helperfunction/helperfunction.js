"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegistrationEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// import { json } from 'stream/consumers';
// import { error } from 'console';
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.SENDER_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            text: text,
            subject: subject,
            html: `<p>${text}</p>`,
        };
        const mailRes = await transporter.sendMail(mailOptions);
        let res = '';
        if (mailRes.accepted.length > 0) {
            res = 'Email sent successfully';
        }
        else if (mailRes.rejected.length > 0) {
            res = 'Email not sent, please try again';
        }
        else {
            res = 'Internal server error, please try again later';
        }
        return res;
    }
    catch (error) {
        console.log(error);
        return `Error: ${error.message}`;
    }
};
exports.sendEmail = sendEmail;
const sendRegistrationEmail = async (email, eventName) => {
    try {
        const subject = `Registration confirmation for ${eventName}`;
        const message = `Hello, you have successfully registered for ${eventName}`;
        const emailResponse = await (0, exports.sendEmail)(email, subject, message);
        return emailResponse;
    }
    catch (error) {
        console.log(error?.message);
        throw error;
    }
};
exports.sendRegistrationEmail = sendRegistrationEmail;
