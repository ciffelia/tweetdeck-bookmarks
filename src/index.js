import addTweetToBookmark from './addTweetToBookmark'
import showNotification from './showNotification'

const main = () => {
  const menuItem = `
    <li class="is-selectable">
      <a href="#" data-action data-bookmark-tweet="{{chirp.id}}">Add Tweet to Bookmarks</a>
    </li>
  `

  TD.mustaches['menus/actions.mustache'] = TD.mustaches['menus/actions.mustache'].replace(/{{\/chirp}}\s*<\/ul>/, `${menuItem}{{/chirp}}</ul>`)

  $(document).on('click', '[data-bookmark-tweet]', async event => {
    event.preventDefault()

    const tweetOrRetweetId = $(event.target).data('bookmark-tweet')
    const tweetId = $(`[data-key="${tweetOrRetweetId}"]`).data('tweet-id')

    try {
      await addTweetToBookmark(tweetId)
    } catch (err) {
      showNotification(`Failed to add Tweet to Bookmarks: ${err.message}`, 'error')
      return
    }

    showNotification('Tweet added to your Bookmarks')
  })
}

main()
