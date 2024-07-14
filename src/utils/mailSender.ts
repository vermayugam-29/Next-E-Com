import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailSender = async(email : string , title : string , body : any) => {
    try {


        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_ID,
                pass : process.env.MAIL_PASS
            }
        });

        
        let info = await transporter.sendMail({
            from : 'RPR Steel Works',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        });

        return info;
    } catch (error : any) {
        console.log(error.message);
    }
}

export default mailSender;