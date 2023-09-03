const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        dateTime: {
            type: Date,
            default: Date.now
        },
        usersAccessed: [
            {
                name: {
                    type: String,
                    required: true
                },
                message: {
                    type: String, required: true
                }
            }
        ]

    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;