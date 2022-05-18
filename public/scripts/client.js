/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = function (data) {
    let $tweet = $(`
      <article class="tweets-container">
        <img
          src="${data.user.avatars}"
          alt="profile-picture"
          class="thumbnail"
        />
        <div class="user-fullname">${data.user.name}</div>
        <div class="user-handle">${data.user.handle}</div>
        <div class="tweet-content">${data.content.text}
        </div>
        <div class="time-stamp">${data.created_at}</div>
        <div class="grid-icons">
          <div class="flex-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </article>`);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".all-tweets").prepend($tweet);
    }
  };

  renderTweets(data);
});
