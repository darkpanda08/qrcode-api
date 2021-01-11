const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Code = mongoose.model('code', CodeSchema);

module.exports = Code;