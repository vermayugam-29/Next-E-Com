import mongoose , {Schema , Document} from "mongoose";
import {ADDRESS, addressSchema } from './addressModel';

// mongoose.models.Address || mongoose.model('Address' , addressSchema);

export interface PROFILE extends Document {
    phoneNumber : string,
    profilePhoto : string,
    addresses : ADDRESS[],
    defaultAddress : ADDRESS | null,
    dob : string,
    gender : string
}

export const profileSchema : Schema<PROFILE> = new mongoose.Schema({
    phoneNumber : {
        type : String
    },
    profilePhoto : {
        type : String
    },
    addresses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    }],
    defaultAddress : {
        type : mongoose.Schema.Types.ObjectId || null,
        ref : 'Address'
    },
    dob : {
        type : String,
        trim : true,
    } ,
    gender : {
        type : String,
        enum : ['Male' , 'Female' , 'Prefer Not to say'],
        trim : true,
    }
},{
    timestamps : true
})


const Profile = mongoose.models.Profile as mongoose.Model<PROFILE> || 
                mongoose.model<PROFILE>('Profile' , profileSchema);
export default Profile;