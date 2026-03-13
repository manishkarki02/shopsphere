import nodemailer from "nodemailer";
import Environment from "@/configs/env";
import logger from "@/configs/logger";

const transporter = nodemailer.createTransport({
    host: Environment.get("SMTP_HOST"),
    port: Environment.get("SMTP_PORT"),
    auth: {
        user: Environment.get("SMTP_EMAIL"),
        pass: Environment.get("SMTP_PASSWORD"),
    },
});

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
    const mailOptions = {
        from: Environment.get("SMTP_EMAIL"),
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${options.to}`);
    } catch (error) {
        logger.error("Email sending failed:", error);
        throw error;
    }
};
