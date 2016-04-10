var tap = require('tap-event')
var domify = require('domify')
var template = require('./template.html')
var classes = require('classes')
var event = require('event')
var detect = require('prop-detect')
var transitionEnd = detect.transitionend

document.addEventListener('touchstart', function(){}, true)

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
  var el = domify(template)
  var body = el.querySelector('.actionsheet-body')
  Object.keys(option).forEach(function (key) {
    if (key == 'cancel') return
    var o = option[key]
    body.appendChild(domify('<div class="actionsheet-item" data-action="' + key + '">' + o.text + '</div>'))
  })
  if (option.cancel) {
    var text = option.cancel.text || 'cancel'
    body.parentNode.appendChild(domify('<div class="actionsheet-foot"><div class="actionsheet-item cancel">' + text + '</div></div>'))
  }
  document.body.appendChild(el)

  var ontap = tap(function (e) {
    var target = e.target
    cleanUp()
    if (target.hasAttribute('data-action')){
      var action = target.dataset.action
      var cb = option[action].callback
      if (cb) cb.call(null)
    }
  })
  event.bind(el, 'touchstart', ontap)
  function end() {
    event.unbind(el, transitionEnd, end)
    if (el.parentNode) el.parentNode.removeChild(el)
  }
  function cleanUp() {
    event.unbind(el, 'touchstart', ontap)
    event.bind(el, transitionEnd, end)
    classes(el).remove('active')
  }
  return new Promise(function (resolve) {
    setTimeout(function () {
      classes(el).add('active')
      resolve()
    }, 20)
  })
}
