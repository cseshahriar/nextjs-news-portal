import nodemailer from 'nodemailer';


export async function sendEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: "~sR4[bhaC[Qs"
        },
        tls: {rejectUnauthorized: false},
    });

    let mailOptions = {
        from : "Next Js News Portal <info@teamrabbil.com>",
        to: to,
        subject: subject,
        text: body
    }
    return await transporter.sendMail(mailOptions);
}