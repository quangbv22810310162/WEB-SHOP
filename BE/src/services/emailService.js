require('dotenv').config();
const nodemailer = require("nodemailer");

// Tạo transporter chung để tái sử dụng
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const sendSimpleEmail = async (dataSend) => {
    try {
        let info;
        if (dataSend.type === 'verifyEmail') {
            info = await transporter.sendMail({
                from: '"Cardina Fashion" <nguyenthiminhphuong1032004@gmail.com>',
                to: dataSend.email,
                subject: "Verify | Cardina Fashion",
                html: getBodyHTMLEmailVerify(dataSend),
            });
        }
        if (dataSend.type === 'forgotpassword') {
            info = await transporter.sendMail({
                from: '"Cardina Fashion" <nguyenthiminhphuong1032004@gmail.com>',
                to: dataSend.email,
                subject: "Confirm forgotten password | Cardina Fashion",
                html: getBodyHTMLEmailForgotPassword(dataSend),
            });
        }
        return info;
    } catch (error) {
        console.error("Error sending simple email:", error);
        throw error;
    }
};

const sendContactEmail = async (dataSend) => {
    try {
        const info = await transporter.sendMail({
            from: '"Cardina Fashion" <nguyenthiminhphuong1032004@gmail.com>',
            to: process.env.CONTACT_EMAIL,
            subject: `Contact from ${dataSend.name}`,
            html: getBodyHTMLEmailContact(dataSend),
        });
        return info;
    } catch (error) {
        console.error("Error sending contact email:", error);
        throw error;
    }
};

const sendNewsletterEmail = async (dataSend) => {
    try {
        const info = await transporter.sendMail({
            from: '"Cardina Fashion" <nguyenthiminhphuong1032004@gmail.com>',
            to: dataSend.email,
            subject: "Thank you for subscribing to our newsletter",
            html: getBodyHTMLEmailNewsletter(dataSend),
        });
        return info;
    } catch (error) {
        console.error("Error sending newsletter email:", error);
        throw error;
    }
};

const getBodyHTMLEmailContact = (dataSend) => {
    return `
        <h3>Hello Admin,</h3>
        <p>You received a new contact message from ${dataSend.name}.</p>
        <p><strong>Email:</strong> ${dataSend.email}</p>
        <p><strong>Message:</strong> ${dataSend.message}</p>
        <div>Thank you!</div>
    `;
};

const getBodyHTMLEmailNewsletter = (dataSend) => {
    return `
        <h3>Dear ${dataSend.name},</h3>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>We will send you the latest updates and offers from Cardina Fashion.</p>
        <div>Best Regards,</div>
        <div>Cardina Fashion</div>
    `;
};

const getBodyHTMLEmailVerify = (dataSend) => {
    let fullname = `${dataSend.firstName} ${dataSend.lastName}`;
    return `
        <h3>Hello ${fullname}!</h3>
        <p>You received this email because you performed an email validation command!</p>
        <p>Please click on the link below to confirm and complete your email verification procedure:</p>
        <div>
            <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
        </div>
        <div>Thank you!</div>
    `;
};

const getBodyHTMLEmailForgotPassword = (dataSend) => {
    let fullname = `${dataSend.firstName} ${dataSend.lastName}`;
    return `
        <h3>Hello ${fullname}!</h3>
        <p>You received this email because you performed a forgotten password command!</p>
        <p>Please click on the link below to confirm and complete your password reset procedure:</p>
        <div>
            <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
        </div>
        <div>Thank you!</div>
    `;
};

module.exports = {
    sendSimpleEmail,
    sendContactEmail,
    sendNewsletterEmail
};
