// utils/sendMail.js
import conf from "../conf/conf.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: conf.nodemailAuth || "himanshutamoli2005@gmail.com",
        pass: conf.nodemailPass || "muft dfpt ssvx fyjd",
    },
});


const sendMail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: conf.nodemailAuth || "himanshutamoli2005@gmail.com",
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
// console.log("Email sent:", info.response)
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendMail;
