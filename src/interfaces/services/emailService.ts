import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    service:'Gmail',
    auth:{
        user:'ajith2001mohith2@gmail.com',
        pass:'mbmghnnbdglkcwfu'
    }
})

export const sendOtpEmail = async(email:string,otp:string)=>{
    console.log("Nodemailer mail",process.env.EMAIL_FIXHIT)
    console.log(`Nodemailer password:${process.env.EMAIL_PASS}`)
    console.log("Otp is ",otp)
    try{ 

        const mailOptions ={
            from:process.env.EMAIL_FIXHIT as string,
            to:email,
            subject:"FixHit OTP Verification",
            text:`Your OTP for verification is: ${otp}. `
        }
    
        await transporter.sendMail(mailOptions)
        console.log("Mail send from transporter")

    }catch(err){
        console.log("Error in seding otp",err)
    }
   
}

