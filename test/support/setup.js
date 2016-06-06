var jsdom = require('jsdom')

// Setup the simplest document possible.
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

// Get the window object out of the document.
var win = doc.defaultView

// Set globals for mocha that make access to document and window feel
// natural in the test environment.
global.document = doc
global.window = win

// Take all properties of the window object and also attach it to the
// mocha global object.
propagateToGlobal(win)

// https://github.com/rstacruz/mocha-jsdom/blob/c7edc92cde47a9bbf9ee37c60246bad5942c64f0/index.js#L92-L106
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
