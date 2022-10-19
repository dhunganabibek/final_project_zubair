const { USER_TYPE } = require('../enums');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 255 },
    contact: { type: String, unique: true, required: true, minlength: 10, maxlength: 10 },
    address: { type: String, minlength: 3, maxlength: 255 },
    email: { type: String, unique: true, sparse: true, index: true, maxlength: 255 },
    password: { type: String, minlength: 4, maxlength: 255 },
    createdOn: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    userType: { type: String, required: true, enums: USER_TYPE, default: "CUSTOMER" }
});

module.exports = mongoose.model('user', userSchema);