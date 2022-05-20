/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
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
        <div class="time-stamp">${timeago.format(data.created_at)}</div>
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

  $(".new-tweet-container").on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    const data2 = $("#text").val();

    if (data2.length === 1) {
      alert("short");
    } else if (data2.length > 140) {
      alert("long");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data,
      }).then(function () {
        $(".all-tweets").trigger("reset");
        loadTweets();
        $("#text").val("");
      });
    }
  });

  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
    })
      .then((data) => {
        renderTweets(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadTweets();
});
