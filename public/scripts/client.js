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
      <header class="header">
          <div>
          <img src=${tweet.user.avatars} class="avatar">
          <span> ${tweet.user.name} </span>
          </div>
          <output name="username"> ${tweet.user.handle} </output>
        </header>
        <p class="tweet-text">
          ${safeHTML}
        </p>
        <footer class="footer">
          <span> ${timeago.format(tweet.created_at)} </span> 
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;
    // create jQuery object from markup amd return
    let $tweet = $(markup);
    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }

    $(".tweet").hover(function () {
      $(this).toggleClass('highlightBox')
    });

    $(".fa-flag").hover(function () {
      $(this).toggleClass('iconColor')
    });

    $(".fa-heart").hover(function () {
      $(this).toggleClass('iconColor')
    });

    $(".fa-retweet").hover(function () {
      $(this).toggleClass('iconColor')
    });

  };

  const form = $('#new-tweet');
  form.on('submit', function (event) {
    event.preventDefault();
    // find the actual input that the user added
    const input = $('#tweet-text').first().val();

    const serializedData = $(this).serialize();

    //$(".error").hide();
    $(".error").slideUp("slow")

    // allotment is 140 characters
    if (input.length > 140) {
      $(".error").slideDown("slow")
      return;
    }

    if (input === "") {
      alert('No tweet submitted!')
      return;
    }
    
    // reset form so the previous input goes away
    $(this)[0].reset();

    $.post('/tweets/', serializedData)
      .then(() => {
        loadTweets()
      })
      .catch(err => {
        console.log(err.message)
      })

  })

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/tweets",
      success: tweets => {
        renderTweets(tweets)
      },
      error: error => console.log(error)
    })
  }

  //$tweet = $(".tweet")

});
