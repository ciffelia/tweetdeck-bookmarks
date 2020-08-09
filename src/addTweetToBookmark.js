const getCsrfToken = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('ct0='))
    .split('=')[1]

  return csrfToken
}

const addTweetToBookmark = async tweetId => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
    'X-Csrf-Token': getCsrfToken()
  }

  const response = await fetch('https://api.twitter.com/1.1/bookmark/entries/add.json', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: `tweet_id=${tweetId}`
  })

  const result = await response.json()

  if (!response.ok) {
    const errorMessage = result.errors[0].message
    throw new Error(errorMessage)
  }
}

export default addTweetToBookmark
