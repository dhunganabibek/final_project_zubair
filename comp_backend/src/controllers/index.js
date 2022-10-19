const express = require('express');
const router = express.Router();

require('./routes/user')(router);
require('./routes/ticket')(router);

module.exports = router;