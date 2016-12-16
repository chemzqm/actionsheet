var tap = require('tap-event')
var domify = require('domify')
var template = require('./template.html')
var classes = require('classes')
var event = require('event')
var detect = require('prop-detect')
var transitionEnd = detect.transitionend

document.addEventListener('touchstart', function(){}, true)
var shown

/**
 * create action sheet
 * option contains key for actions.
 * action should contain text and callback
 *
 * @public
 * @param {Object} option
 * @returns {Promise}
 */
module.exports = function (option) {
  if (shown) return
  var el = domify(template)
  var body = el.querySelector('.actionsheet-body')
  Object.keys(option).forEach(function (key) {
    if (key == 'cancel') return
    var o = option[key]
    if (o.hide === true) return
    body.appendChild(domify('<div class="actionsheet-item" data-action="' + key + '">' + o.text + '</div>'))
  })
  if (option.cancel) {
    var text = option.cancel.text || 'cancel'
    body.parentNode.appendChild(domify('<div class="actionsheet-foot"><div class="actionsheet-item cancel">' + text + '</div></div>'))
  }
  document.body.appendChild(el)
  shown = true

  var ontap = tap(function (e) {
    var target = e.target
    if (target.hasAttribute('data-action')){
      var action = target.dataset.action
      var opt = option[action]
      var cb = opt.callback
      if (opt.redirect) cb = function () {
        window.location.href = opt.redirect
      }
      var nowait = opt.nowait
      if (!cb) return
      if (nowait) {
        cleanUp()
        cb()
      } else {
        if (cb) cleanUp().then(cb)
      }
    } else {
      cleanUp()
    }
  })
  event.bind(el, 'touchstart', ontap)
  event.bind(el, 'click', ontap)


  function cleanUp() {
    return new Promise(function (resolve) {
      event.unbind(el, 'touchstart', ontap)
      event.bind(el, transitionEnd, end)
      classes(el).remove('active')
      function end() {
        shown = false
        event.unbind(el, transitionEnd, end)
        if (el.parentNode) el.parentNode.removeChild(el)
        resolve()
      }
    })
  }
  return new Promise(function (resolve) {
    setTimeout(function () {
      classes(el).add('active')
      resolve()
    }, 20)
  })
}
