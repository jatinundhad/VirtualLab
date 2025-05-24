import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, uniqueString) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_HOST,
        pass: process.env.SMTP_HOST_PWD,
      },
    });

    transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "no-reply: Virtual Lab email verification",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Verification Email</title>
          <style>
            #content {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333333 !important;
              background-color: #caf0f8;
              padding: 20px;
              border-radius: 10px;
              background-image: linear-gradient(to right bottom, #0077b6,#03045e);
          color:white !important;
            }
            
            #content  h1 {
              font-size: 24px;
              margin-bottom: 20px;
            }
            
            #content p {
              margin-bottom: 10px;
            }
          
            
            #content #verification-id{
              background-color: skyblue;
              color: black;
              padding: 5px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
        <div id="content">
          <h1>Verify your email address</h1>
          <p>Thank you for signing up for our service. To complete your registration, please verify your email address by entering the verification ID below:</p>
          <p><b>Verification ID:</b> <span id="verification-id">${uniqueString}</span></p>
          <p>Enter the verification ID in the registration form to activate your account.</p>
          <p>If you did not sign up for our service, please ignore this email.</p>
          <p>Thank you,</p>
          <p>The Team</p>
          </div>
        </body>
      </html>
      `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export default sendEmail;
