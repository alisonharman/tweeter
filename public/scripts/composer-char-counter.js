$(document).ready(function() {
  // --- our code goes here ---
  const $counter = $(".counter");

  $("#tweet-text").on( "input", function(event) {
    // find number of characters inputted into textarea
    let characterCount = $(this).val().length;
    // number of lettersRemaining in tweet
    let lettersRemaining = 140 - parseInt(characterCount);
    // traverse DOM tree to access <output> tag with id=counter
    const $counter = $(this).parent().parent().find("output");
    // color text red if letterRemaining is negative, else text is default black
    if (lettersRemaining < 0) {
      $counter.addClass("negative");
    } else {
      $counter.removeClass("negative");
    }
    // update counter text
    $counter.text(lettersRemaining);
  });
});