$(document).ready(function () {
  $(".new-tweet-text").on("input", function () {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const remainingCount = maxLength - currentLength;
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
