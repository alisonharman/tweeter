/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function (tweet) {

    const markup = `<article class=tweet> 
      <header class="header">
          <div>
          <img src=${tweet.user.avatars} height=40>
          <span> ${tweet.user.name} </span>
          </div>
          <output name="username"> ${tweet.user.handle} </output>
        </header>
        <p class="tweet-text">
        ${tweet.content.text}
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

    // let $tweet = $(`<article class="tweet">Hello world</article>`);
    let $tweet = $(markup);
    
    return $tweet;
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };
  
  //renderTweets(data);

  const form = $('#new-tweet');
  form.on('submit', function(event) {
    event.preventDefault();
    const input = $('#tweet-text').first().val();
    
    const serializedData = $(this).serialize();

    // allotment is 140 characters
    if (input.length > 140) {
      alert('Tweet is too long!')
      return;
    }

    if (input === "") {
      alert('No tweet submitted!')
      return;
    }

    $.post('/tweets/', serializedData)
      .then(() => {
        loadTweets()
      })
      .catch(err => {
        console.log(err.message)
      })

  })

  const loadTweets = function() {
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

  //loadTweets();

  $("article").hover(function () {
    $(this).toggleClass('highlightBox')
  });

  $(".fa-flag").hover(function () {
    $(this).toggleClass('iconColor')
  });

  $(".fa-heart").hover(function () {
    //console.log($(this))
    $(this).toggleClass('iconColor')
  });

  $(".fa-retweet").hover(function () {
    //console.log($(this))
    $(this).toggleClass('iconColor')
  });

});
