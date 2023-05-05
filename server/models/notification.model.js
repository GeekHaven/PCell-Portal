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
    target:{
        type:String,
        required:true,
    },
},{timestamps:true});
export default model("Notification",NotificationSchema);
