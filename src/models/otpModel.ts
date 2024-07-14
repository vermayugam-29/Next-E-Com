import mongoose, { Document, Schema } from "mongoose";
import mailSender from '@/utils/mailSender';
import otpTemplate from '../../mailTemplates/verificationCode'


export interface Otp extends Document { 
    email : string,
    otp : string,
    createdAt : Date
}

const otpSchema : Schema<Otp> = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true
        } ,
        otp : {
            type : String ,
            required : true,
        },
        createdAt : {
            type : Date,
            default : Date.now(),
            expires : 60 * 3,
        }
    }
);


async function sendVerificationEmail(email : string, otp : string) {
    try {
        const mailRes = await mailSender(email , 'Verification Email from RPR' , otpTemplate(otp));
        console.log('Mail sent success' , mailRes);
    } catch(error : any){
        console.log(error);
        throw new Error(error.message)
    }
}

otpSchema.pre('save', async function(next){
    if (this.email && this.otp) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

const OTP = mongoose.models.OTP as mongoose.Model<Otp> || mongoose.model('OTP' , otpSchema);
export default OTP