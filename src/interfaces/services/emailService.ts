import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.EMAIL_FIXHIT,
        pass:process.env.EMAIL_PASS
    }
})

export const sendOtpEmail = async(email:string,otp:string)=>{
    const mailOptions ={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"FixHit OTP Verification",
        text:`Your OTP is ${otp}. Expires in 5 minutes`
    }

    await transporter.sendMail(mailOptions)
}

