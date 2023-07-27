const { Schema, model, Types } = require('mongoose');

var date = new Date()


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
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: createdAt => date.toDateString(createdAt)
    },

},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    
        _id: false,
    
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
            type:Date,
            default:Date.now,
            get: createdAt => date.toDateString(createdAt)
        
    },
    userName:{
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
 
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    
        id: false,
    
}
)
// usernameSchema.virtual("friendCount").get(function () {
//     return this.friends.length;})
thoughtsSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})
const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts