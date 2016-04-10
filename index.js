var notice = require('notice')
var tap = require('tap-event')
var event = require('event')
require('../style.css')
var as = require('..')

event.bind(document.getElementById('demo'), 'touchstart', tap(function () {
  as({
    save: {
      text: 'save',
      callback: function () {
        notice('Save tapped', {duration: 2000})
      }
    },
    complain: {
      text: 'complain',
      callback: function () {
        notice('Complain tapped', {duration: 2000})
      }
    },
    cancel: {
      text: 'cancel'
    }
  }).then(function () {
    console.log('action sheet shown')
  })
}))
