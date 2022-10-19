const USER_TYPE = Object.keys(require('../constants/db/users').USER_TYPE);
const DEVICE_TYPE = Object.values(require('../constants/db/ticket').DEVICE_TYPE);
const ISSUE_IN = Object.values(require('../constants/db/ticket').ISSUE_IN);
const ISSUE_TYPE = Object.values(require('../constants/db/ticket').ISSUE_TYPE);
const HARDWARE_TYPE = Object.values(require('../constants/db/ticket').HARDWARE_TYPE);
const RAISED_VIA = Object.values(require('../constants/db/ticket').RAISED_VIA);
const TICKET_STATUS_TYPE = Object.values(require('../constants/db/ticket').TICKET_STATUS_TYPE);

module.exports = Object.freeze({
    USER_TYPE, DEVICE_TYPE, ISSUE_IN, ISSUE_TYPE, HARDWARE_TYPE, RAISED_VIA, TICKET_STATUS_TYPE
})
