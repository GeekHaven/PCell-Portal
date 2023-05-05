import {Schema,model} from "mongoose";
const NotificationSchema=Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    bannerImg:{
        type:String,
    },
},{timestamps:true});
export default model("Notification",NotificationSchema);