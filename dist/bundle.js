// ==UserScript==
// @name         Bookmarks in TweetDeck
// @namespace    https://ciffelia.com/
// @version      1.0.5
// @description  'Add Tweet to Bookmarks' in TweetDeck!
// @author       Ciffelia <mc.prince.0203@gmail.com> (https://ciffelia.com/)
// @license      MIT
// @homepage     https://github.com/ciffelia/tweetdeck-bookmarks#readme
// @supportURL   https://github.com/ciffelia/tweetdeck-bookmarks/issues
// @include      https://tweetdeck.twitter.com/
// @require      https://unpkg.com/moduleraid@5.0.1/dist/moduleraid.iife.js
// ==/UserScript==

(function () {
  'use strict';

  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('ct0='))
      .split('=')[1];

    return csrfToken
  };

  const addTweetToBookmark = async tweetId => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
      'X-Csrf-Token': getCsrfToken()
    };

    const response = await fetch('https://api.twitter.com/1.1/bookmark/entries/add.json', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: `tweet_id=${tweetId}`
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.errors[0].message;
      throw new Error(errorMessage)
    }
  };

  // eslint-disable-next-line new-cap
  const mR = new moduleraid();

  const TDNotifications = mR.findModule('showNotification')[0];

  const showNotification = (message, type = 'info') => {
    if (type === 'info') {
      TDNotifications.showNotification({ message });
    } else if (type === 'error') {
      TDNotifications.showErrorNotification({ message });
    } else {
      throw new Error(`Unknown notification type: ${type}`)
    }
  };

  const main = () => {
    const menuItem = `
    <li class="is-selectable">
      <a href="#" data-action data-bookmark-tweet="{{chirp.id}}">Add Tweet to Bookmarks</a>
    </li>
  `;

    TD.mustaches['menus/actions.mustache'] = TD.mustaches['menus/actions.mustache'].replace(/{{\/chirp}}\s*<\/ul>/, `${menuItem}{{/chirp}}</ul>`);

    document.body.addEventListener('click', async event => {
      const tweetOrRetweetId = event.target.dataset.bookmarkTweet;
      if (tweetOrRetweetId == null) {
        return
      }

      const tweetId = document.querySelector(`[data-key="${tweetOrRetweetId}"]`).dataset.tweetId;

      try {
        await addTweetToBookmark(tweetId);
      } catch (err) {
        showNotification(`Failed to add Tweet to Bookmarks: ${err.message}`, 'error');
        return
      }

      showNotification('Tweet added to your Bookmarks');
    });
  };

  main();

}());
