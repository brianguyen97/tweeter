/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // HTML Template for Tweets
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
        <div class="tweet-content">${escape(data.content.text)}
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

  // Helper Functions

  // Prevent XSS
  const escape = function (data) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(data));
    return div.innerHTML;
  };

  // Pass in array as paraameter, prepends every element in our .all-tweets container
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".all-tweets").prepend($tweet);
    }
  };

  // Makes a GET request to /tweets then uses our renderTweets function to load that data
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

  // Same functionality as loadTweets, but gets the latest tweet
  const latestTweet = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
    })
      .then(function (data) {
        const tweet = data.slice(data.length - 1);
        renderTweets(tweet);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  // Event listener to post textbox data to /tweets
  $(".short-error").hide();
  $(".long-error").hide();
  $(".new-tweet-container").on("submit", function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    const data2 = $("#text").val();

    if (data2.length === 1) {
      $(".long-error").hide();
      $(".short-error").slideDown("slow");
    } else if (data2.length > 140) {
      $(".short-error").hide();
      $(".long-error").slideDown("slow");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data,
      })
        .then(function () {
          $(".all-tweets").trigger("reset");
          latestTweet();
          $("#text").val("");
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  });

  loadTweets();
});
