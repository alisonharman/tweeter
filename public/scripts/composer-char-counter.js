$(document).ready(function() {
  // --- our code goes here ---
  const counter = $("#new-tweet-counter");

  $("#new-tweet-text").on( "input", function() {
    // find number of characters inputted into textarea
    let characterCount = $(this).val().length;
    // number of lettersRemaining in tweet
    let lettersRemaining = 140 - parseInt(characterCount);
    // color text red if letterRemaining is negative, else text is default black
    if (lettersRemaining < 0) {
      counter.addClass("max-count-reached");
    } else {
      counter.removeClass("max-count-reached");
    }
    // update counter text
    counter.text(lettersRemaining);
  });
});