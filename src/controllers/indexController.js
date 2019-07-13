var models  = require('../models');
var express = require('express');
var router  = express.Router();
const uuid = require('uuid/v4');


exports.index = function onIndex(req, res) {
  // TODO: if already logged in, redirect to somewhere else
  console.log('Inside the homepage callback function');
  console.log(req.sessionID);
  // res.render('index', { title: 'Home' } );
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

//   res.renderVue('../App.vue', data, req.vueOptions);
  res.renderVue('../components/Layout.vue', data, req.vueOptions);
  // const uniqueId = uuid();
  // res.send(`Hit home page. Received the unique id: ${uniqueId}\n`);
};
