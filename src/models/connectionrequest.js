const mongoose=require("mongoose");
const connectionRequestSchema =new mongoose.Schema({
    fromUserId:{
         type:mongoose.Schema.Types.ObjectId,  // this means This field will store a MongoDB ObjectId value. that is _id
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:["interested","ignored","accepted","rejected"
        ],
        message:'{VALUE} is inccorrect status type',
    }
},
{
timestamps:true
}
)
connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save",function(){
const connectionReqquest=this
if(connectionReqquest.fromUserId.equals(connectionReqquest.toUserId)){
    throw new Error("can't senc request to urself");
}

})
module.exports=mongoose.model("connectionRequestModel",connectionRequestSchema);