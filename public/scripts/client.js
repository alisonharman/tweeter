
// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
          <span> ${tweet.created_at} </span> 
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
      $('#tweets-container').append($tweet);
    }
  };
  
  renderTweets(data);

  const form = $('#new-tweet');
  form.on('submit', function(event) {
    event.preventDefault();
    console.log(event);
    const serializedData = $(this).serialize();
    console.log(serializedData);

    $.post('/tweets/', serializedData)
      .then((resp) => {
        console.log(resp);
      })

  })

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
