import nodemailer from "nodemailer";

export const verificationMail = async (email, otp) => {
       try {
              const transporter = nodemailer.createTransport({
                     service: "gmail",
                     auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASS,
                     },
              });

              const mailOptions = {
                     from: process.env.MAIL_USER,
                     to: email, // FIXED ✔
                     subject: "Your OTP Code",
                     html: `
                            <div>
                                   <h2>Email Verification</h2>
                                   <p>Your OTP is: <b>${otp}</b></p>
                                   <p>Valid for <b>5 minutes</b>.</p> 
                            </div>
                     `,
              };

              await transporter.sendMail(mailOptions);
       } 
       catch (error) {
              console.log("Email error:", error);
       }
};
