const { Schema, model, Types } = require('mongoose');

const usernameSchema = new Schema({
    userName:{
        type: String,
        required: "user name is required",
        trim: true
    },
    email:{
        type: String,
        required: "email is Required",
        unique: true,
        match: `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`
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
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const User = model("User", usernameSchema)

module.exports = User