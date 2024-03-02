const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    artistName: {
        type: String,
        required: true
    },
    isCheck: {
        type: Boolean,
        default: false
    },
    albumName: {
        type: String
    },
    songImage: {
        type: String
    },
    audioFile: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("music-collection", musicSchema);
