const mongoose = require('mongoose');

const Project = new mongoose.Schema({
    project: String,
    version: String,
    downloads: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('download', Project);