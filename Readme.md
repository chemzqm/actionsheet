# ActionSheet

Action sheet component

![capture](https://chemzqm.me/images/04-10/actionsheet.jpeg)

[demo](https://chemzqm.github.io/actionsheet)

## Install

    npm i actionsheet -S

## Example

``` js
var as = require('actionsheet')
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
```

## API

### Actionsheet(option)

Init ActionSheet with `option`
* `option` contains actions, key is action name.
* `option.action` action contains `text` and `callback`.
* `option.cancel` is special action, you can omit `callback` for it.

## License

  Copyright 2016 chemzqm@gmail.com

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
