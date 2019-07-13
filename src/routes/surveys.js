var models  = require('../models');
const express = require('express');
const router  = express.Router();

const surveyController = require('../controllers/surveyController');

// router.param('surveyId', function(req, res, next, surveyId) {
//   console.log(`fetching survey with id ${surveyId}`);
  
// });

router.get('/', surveyController.survey_list);
router.get('/new', surveyController.survey_create_get);
router.get('/:id', surveyController.survey_detail);
// router.post('/new', surveyController.survey_create_post);
// router.get('/:surveyId/edit', surveyController.survey_update_get);
// router.post('/:surveyId/edit', surveyController.survey_update_post);

module.exports = router;
