import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'minhsoc5@gmail.com',
        pass: 'mssh idqv vrgt obxw'
    }
})