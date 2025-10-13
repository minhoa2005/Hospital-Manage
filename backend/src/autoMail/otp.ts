import nodemailer from "nodemailer";
import "dotenv/config"


const sendOtp = async (email: string, otp: number): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
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
        const info = await transporter.sendMail(mail);
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export default sendOtp