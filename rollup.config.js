import packageJson from './package.json'

const banner = `
// ==UserScript==
// @name         Bookmarks in TweetDeck
// @namespace    https://ciffelia.com/
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @author       ${packageJson.author}
// @license      ${packageJson.license}
// @homepage     ${packageJson.homepage}
// @supportURL   ${packageJson.bugs}
// @include      https://tweetdeck.twitter.com/
// @require      https://unpkg.com/moduleraid@5.0.1/dist/moduleraid.iife.js
// ==/UserScript==
`.trim() + '\n'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    banner
  }
}
