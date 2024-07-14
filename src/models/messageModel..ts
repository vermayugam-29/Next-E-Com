import mongoose , {Schema , Document} from 'mongoose';
import { USER , userSchema} from './userModel';

// mongoose.model('User' , userSchema);

export interface MESSAGE extends Document {
    user : USER,
    description : string,
    maxDeleteDate : Date,
    deleteType : string,
    deletedBy : USER
}

export const messageSchema : Schema<MESSAGE> = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } ,
    description : {
        type : String,
        required : true,
        trim : true
    } ,
    maxDeleteDate : {
        type : Date,
        default : () => new Date(Date.now() + 2 * 60 * 60 * 1000)
    } ,
    deleteType : {
        type : String,
        enum : ['Delete For Everyone' , 'Delete For Me']
    } ,
    deletedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
} , {
    timestamps : true
})

const Message = mongoose.models.Message as mongoose.Model<MESSAGE> ||
                mongoose.model('Message' , messageSchema);

export default Message;