const express = require('express');
const router = express.Router();

// Require controller modules.

const session_controller = require('../../../controllers/sessionController');

/// SESSION ROUTES ///

router.delete('/', session_controller.logout);

module.exports = router;
