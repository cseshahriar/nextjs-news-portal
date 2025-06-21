import nodemailer from 'nodemailer';


export async function customSendEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.APP_PASS
        },
        tls: {rejectUnauthorized: false},
    });

    let mailOptions = {
        from: `Next Js News Portal <${process.env.MAIL_FROM}>`,
        to: to,
        subject: subject,
        text: body
    }
    const info = await transporter.sendMail(mailOptions);
    return info;
}