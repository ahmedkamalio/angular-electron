'use strict'

// -- Module dependencies --

const { resolve } = require('app-root-path')
const { existsSync } = require('fs-extra')

// Path to electron entry file.
const APP_ENTRY = resolve('build/bin/main.js')

// Throw error if electron entry file not exists.
if (!existsSync(APP_ENTRY)) {
  throw new Error('app not built, run "yarn build" and try again.')
}

// Run the app.
require(APP_ENTRY)
