import nodemailer from "nodemailer";
import "dotenv/config"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})
const sendOtp = async (email: string, otp: number): Promise<boolean> => {
    const mail = {
        from: `"Hospital Service" <tranducminh4125@gmail.com>`,
        to: email,
        subject: "Your recovery OTP",
        html:
            `
            <div 
                style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align:center"
            >
                <h1>Your OTP</h1>
                <h2 style="color: #333;">${otp}</h2>
                <p>Please do not give this code to anyone, this code will expire in 5 minutes</p>
            </div>

        `
    }

    try {
        await transporter.sendMail(mail);
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

const sendResetPassword = async (email: string, newPassword: number): Promise<boolean> => {
    const mail = {
        from: `"Hospital Service" <tranducminh4125@gmail.com>`,
        to: email,
        subject: "Your new password",
        html:
            `
            <h1>Your new password</h1>
            <h2 style="color: #333;">${newPassword}</h2>
            <p>Please change this password after logging in.</p>
        `
    }

    try {
        await transporter.sendMail(mail);
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export { sendOtp, sendResetPassword }