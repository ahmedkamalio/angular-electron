'use strict'

// Set NODE_ENV to test so each
// module knows the right env.
process.env.NODE_ENV = 'test'

// -- Module dependencies --

const { Application } = require('spectron')
const root = require('app-root-path')
const electronPath = require('electron')
const assert = require('assert')

// A simple test to verify a visible window is opened with a title and h1 tag rendered.
// @see https://electronjs.org/spectron
// @see https://github.com/electron/spectro

describe('Application launch', function () {
  this.timeout(10000)

  before(function () {
    this.app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: electronPath,

      // Assuming you have the following directory structure

      //  |__ my project
      //     |__ ...
      //     |__ main.js
      //     |__ package.json
      //     |__ index.html
      //     |__ ...
      //     |__ test
      //        |__ spec.js  <- You are here! ~ Well you should be.

      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [root.path]
    })
    return this.app.start()
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(count => {
      // Please note that getWindowCount()
      // will return 2 if `dev tools` are opened.
      return assert.equal(count, 1)
    })
  })

  it('window have title "Angular Electron"', function () {
    return this.app.client.getTitle()
      .then(title => assert.equal(title, 'Angular Electron'))
  })

  it('window have h1 tag rendered with text "Welcome to angular-electron!"', function () {
    return this.app.client.waitUntilWindowLoaded()
      .waitForVisible('h1')
      .getText('h1')
      .then(text => assert.equal(text, 'Welcome to angular-electron!'));
  })

})
