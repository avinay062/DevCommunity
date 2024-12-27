const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    status: {
        type : String,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            messsage : `{VALUE} is incorrect status type`
        },
        required : true,
    }
},{
    timestamps: true
});

connectionRequestSchema.index({ fromUserId : 1, toUserId : 1 });

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //check if fromUserId === toUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself..!!")
    }

    next();
})

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;