$(document).ready(function () {
  $(".new-tweet-text").on("input", function () {
    let maxLength = 140;
    let currentLength = $(this).val().length;
    let remainingCount = maxLength - currentLength;
    if (remainingCount >= 0) {
      $(".counter")
        .addClass("counter")
        .removeClass("counter-negative")
        .text(remainingCount);
    } else {
      $(".counter")
        .addClass("counter-negative")
        .removeClass("counter-positive")
        .text(remainingCount);
    }
  });
});
