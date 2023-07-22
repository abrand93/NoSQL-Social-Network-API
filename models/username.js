const { Schema, model, Types } = require('mongoose');

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
    created:{
        type:Date,
        default:Date.now,
        get: created => moment(created).format('MMM DD, YYYY [at] h:mm:a')
        
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
        },
        id: false,
      },

)
usernameSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const User = model("User", usernameSchema)

module.exports = User