const {
    DEVICE_TYPE, ISSUE_IN, ISSUE_TYPE,
    HARDWARE_TYPE, RAISED_VIA, TICKET_STATUS_TYPE
} = require('../enums');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new mongoose.Schema({
    deviceType: { type: String, required: true, enum: DEVICE_TYPE, maxlength: 255 },
    issueIn: { type: String, required: true, enum: ISSUE_IN, maxlength: 255 },
    issueType: { type: String, enum: ISSUE_TYPE, maxlength: 255 },
    hardwareType: { type: String, enum: HARDWARE_TYPE, maxlength: 255 },
    raisedVia: { type: String, required: true, enum: RAISED_VIA, default: "ONLINE" },
    status: { type: String, required: true, enum: TICKET_STATUS_TYPE, default: "NEW" },
    serial: { type: String, maxlength: 255 },
    description: { type: String, required: true, maxlength: 255 },
    softwareName: { type: String, maxlength: 255 },
    feedback: { type: String, maxlength: 255 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('ticket', ticketSchema);