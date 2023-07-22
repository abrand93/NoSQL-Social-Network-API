const { Schema, model, Types } = require('mongoose');




const ReactionSchema = new Schema({
    reactionId:{
type:Schema.Types.ObjectId,
default:()=> new Types.ObjectId(),

    },
    reactionBody:{
        type:String,
        required:"reaction is required",
        maxlength:280,
    },
    username:{
        type: String,
        required: true,
    }
},
{
    toJSON:{
        virtuals: true,
    },
    
        id:false,
    
}
)


const thoughtsSchema = new Schema({
    thoughtText:{
        type: String,
        required:'text is required',
        minlength: 1,
        maxlength: 280,
    },
    createdAt:{
        type: Date,

    },
    userName:{
        type: String,
        required: true,
    },
    reactions:[ReactionSchema],

})
thoughtsSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})
const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts