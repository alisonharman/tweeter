/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const createTweetElement = function (tweet) {
    // prevent XSS on the inputted tweet text
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `${escape(`${tweet.content.text}`)}`;

    const markup = `<article class=tweet> 
        <header class="tweet-header">
          <div class="tweet-header-user">
            <img src=${tweet.user.avatars} alt="tweet avatar">
            <span>${tweet.user.name}</span>
          </div>
          <p class="tweet-header-handle">${tweet.user.handle}</p>
        </header>
        <p class="tweet-content">
          ${safeHTML}
        </p>
        <footer class="tweet-footer">
          <span class="tweet-footer-timestamp">${timeago.format(
            tweet.created_at
          )}</span> 
          <div class="tweet-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;

    return markup;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweetObject of tweets) {
      const tweet = createTweetElement(tweetObject);
      $("#tweets-container").prepend(tweet);
    }
  };

  const form = $("#new-tweet-form");
  form.on("submit", function (event) {
    event.preventDefault();
    // find the actual input that the user added
    const input = $("#new-tweet-text").val();
    const error = $("#new-tweet-error");

    if (input === "") {
      error[0].textContent = "Too short! Plz write tweet. #kthxbye.";
      error.slideDown("slow");
      return;
    }

    if (input.length > 140) {
      error[0].textContent =
        "Too long! Plz rspct our arbitrary limit of 140 chars. #kthxbye.";
      error.slideDown("slow");
      return;
    }

    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData)
      .then(function () {
        // remove error message if showing
        $("#new-tweet-error").slideUp("slow");
        // reset form so the previous input goes away
        $("#new-tweet-text").val("");
        $("#new-tweet-counter").text(140);
        $("#tweets-container").empty();
        $("section.new-tweet").hide();
        loadTweets();
      })
      .catch(function (err) {
        console.log(err.message);
      });
  });

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/tweets",
      success: (tweets) => renderTweets(tweets),
      error: (error) => console.log(error),
    });
  };

  // so tweets will be retrieved when user first goes to page
  loadTweets();

// toggle new tweet from nav bar arrows
  const $newTweet = $("section.new-tweet");
  const $elem = $('i');
  $elem.on("click", () => {
    $newTweet.slideToggle('fast');
    $newTweet.toggleClass('hidden');
    $("#new-tweet-text").focus();
  });

  // reveal second toggle (on bottom of screen on scroll)
  const $secondToggle = $('.second-toggle')
  
  $(document).on('scroll', () => {
    $secondToggle.removeClass('hidden')
  })
  
  $('#tweet-text').on('focus', () => {
    $secondToggle.addClass('hidden');
    $newTweet.toggleClass('hidden');
  })


});
