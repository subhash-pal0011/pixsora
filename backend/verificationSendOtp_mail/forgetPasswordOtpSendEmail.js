import nodemailer from "nodemailer";

export const forgetPasswordOtpSendEmail = async (email, otp) => {
       try {
              const transporter = nodemailer.createTransport({
                     service: "gmail",
                     secure: true,
                     auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASS,
                     },
              })

              const mailOptions = {
                     from: process.env.MAIL_USER,
                     to: email,
                     subject: "your forgrt password otp",
                     html: `
                            <div>
                               <h2>Password Reset OTP</h2>
                                  <p>Your OTP is: <b>${otp}</b></p>
                                  <p>Valid for <b>5</b> minutes.</p>
                            </div>
                     `,
              }

              await transporter.sendMail(mailOptions)
       } 
       catch (error) {
              console.log("Email error:", error);
       }
}