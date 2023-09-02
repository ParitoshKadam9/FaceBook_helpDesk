const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        Name: {
            type: String, requried: true
        },
        messages: [
            {
                action: {
                    type: String, required: true
                },
                message: {
                    type: String, required: false,
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;