const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

// Check if the model already exists before defining it
const blacklistTokenModel = mongoose.models.blacklistTokenModel || mongoose.model('blacklistTokenModel', blacklistTokenSchema);

module.exports = blacklistTokenModel;