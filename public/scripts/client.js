/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $("article").hover( function() {
    $(this).toggleClass('highlightBox')
  });

  $(".fa-flag").hover( function() {
    $(this).toggleClass('iconColor')
  });

  $(".fa-heart").hover( function() {
    //console.log($(this))
    $(this).toggleClass('iconColor')
  });

  $(".fa-retweet").hover( function() {
    //console.log($(this))
    $(this).toggleClass('iconColor')
  });

});
