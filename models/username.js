const { Schema, model, Types } = require('mongoose');
var date = new Date()

const usernameSchema = new Schema({
    userName:{
        type: String,
        required: "user name is required",
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: createdAt => date.toDateString(createdAt)
        
    },
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'

        }
    
    ],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
    ]
},

    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
      },

)
usernameSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const User = model("User", usernameSchema)

module.exports = User