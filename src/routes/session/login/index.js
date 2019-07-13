const express = require('express');
const router  = express.Router();

// Require controller modules.

const session_controller = require('../../../controllers/sessionController');

/// SESSION ROUTES ///

router.get('/', session_controller.loginGet);
router.post('/', session_controller.loginPost);

module.exports = router;
