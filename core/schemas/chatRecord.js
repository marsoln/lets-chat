const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    resolvedContent: {
        type: String,
        required: true,
    },
    reciever: {
        type: Array,
    },
    createdate: {
        type: Date,
        'default': Date.now(),
    }
})
