var models  = require('../models');
var express = require('express');
var async = require('async');
var debug = require('debug')('survey');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.survey_list = function onSurveyList(req, res, next) {
  debug('survey list');

  models.Survey
    .findAll({
      where: { client_id: req.user.id },
      attributes: { exclude: ['data'] }
    })
    .then(surveys => {
      console.log(`results: ${surveys}`);
      surveys.forEach(survey => {
        console.log(`${survey}`);
      });
    });

  res.send('OK');
};

exports.survey_detail = function onSurveyDetail(req, res, next) {

  console.log(`[surveyController.js] survey: ${JSON.stringify(req.survey)}`);
  console.log(`[surveyController.js] req.user: ${req.user}`);

  models.Survey
  .findOne({
    where: {id: req.params.id},
    include: [
      {
        model: models.Brand,
        attributes: ['name']
      },
      {
        model: models.Reward
      },
      {
        model: models.SurveyLocation
      },
      {
        model: models.Question,
        attributes: { exclude: ['data'] },
        include: [
          {
            model: models.PossibleAnswer,
            attributes: { exclude: ['data'] }
          }
        ]
      }
    ],
    attributes: { exclude: ['data'] }
  })
  .then(survey => {
    // console.log(`[survey_detail] survey: ${JSON.stringify(survey.get({ plain: true }))}`);
    // console.log(`survey.brand: ${JSON.stringify(survey.brand)}`);
    // req.survey = survey;
    // return next();
    console.log(`[surveyController.js] survey.client_id: ${survey.client_id}`);
    console.log(`[surveyController.js] req.client.id: ${req.user.id}`);
    if (req.user.id != survey.client_id) {
      return res.redirect('/surveys');
    }

    res.render('surveys/show', { title: survey.title, survey: survey });
  });

  // console.log(`[survey_detail] survey.bannerModel.bannerUrl: ${req.survey.bannerModel.bannerUrl}`);

  // models.Survey
  //   .findById(req.params.id)
  //   .then(survey => {
  //     console.log(`[survey_detail] survey: ${JSON.stringify(survey.get({ plain: true }))}`);
  //   });

  
  // res.json(req.survey);
};

exports.survey_create_get = function onSurveyCreateGet(req, res, next) {
  // will need access to all the rewards this brand has created
  const data = {
    otherData: 'Something Else' 
  }

  req.vueOptions = {
      head: {
          title: 'Page Title',
          metas: [
              { property:'og:title', content: 'Page Title'},
              { name:'twitter:title', content: 'Page Title'},
          ]
      }
  }

  res.renderVue('../components/SurveyForm.vue', data, req.vueOptions);
};
