import mongoose , {Schema , Document} from "mongoose";
import {ADDRESS} from './addressModel';

export interface PROFILE extends Document {
    phoneNumber : string,
    profilePhoto : string,
    addresses : ADDRESS[]
}

const profileSchema : Schema<PROFILE> = new mongoose.Schema({
    phoneNumber : {
        type : String
    },
    profilePhoto : {
        type : String
    },
    addresses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    }]
})


const Profile = mongoose.models.Profile as mongoose.Model<PROFILE> || 
                mongoose.model('Profile' , profileSchema);
export default Profile;