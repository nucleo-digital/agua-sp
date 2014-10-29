/* globals jQuery, Modernizr */

(function ($) {
  'use strict';

  $(function () {
    var menu = $('#navigation-menu');
    var menuToggle = $('#js-mobile-menu');

    $(menuToggle).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle(function(){
        if(menu.is(':hidden')) {
          menu.removeAttr('style');
        }
      });
    });

    // underline under the active nav item
    $('.nav .nav-link').click(function() {
      $('.nav .nav-link').each(function() {
        $(this).removeClass('active-nav-item');
      });
      $(this).addClass('active-nav-item');
      $('.nav .more').removeClass('active-nav-item');
    });

    if (!Modernizr.svg) {
      $('.navigation .logo img, .hero-logo img').attr('src', function (idx, svgLocation) {
        return svgLocation.replace(/\.svg$/, '.png');
      });
    }

    /**
     * CLOCK
     */
    // Grab the current date
    var currentDate = new Date();

    // Set some date in the past. In this case, it's always been since Jan 1
    var pastDate  = new Date('2014-10-31T10:00:00');

    // Calculate the difference in seconds between the future and current date
    var diff = pastDate.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    $('.quarenta-e-oito-horas').FlipClock(diff, {
      countdown: true
    });
  });

  var myDataRef = new Firebase('https://popping-heat-3998.firebaseio.com/');

  $('#emailInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var email = $('#emailInput').val();

      myDataRef.push({name: name, email: email});

      $('#nameInput').val('');
      $('#emailInput').val('');
    }
  });

   myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.email);
  });

  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
})(jQuery);






// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  // window.fbAsyncInit = function() {
  // FB.init({
  //   appId      : '{your-app-id}',
  //   cookie     : true,  // enable cookies to allow the server to access
  //                       // the session
  //   xfbml      : true,  // parse social plugins on this page
  //   version    : 'v2.1' // use version 2.1
  // });

  // // Now that we've initialized the JavaScript SDK, we call
  // // FB.getLoginStatus().  This function gets the state of the
  // // person visiting this page and can return one of three states to
  // // the callback you provide.  They can be:
  // //
  // // 1. Logged into your app ('connected')
  // // 2. Logged into Facebook, but not your app ('not_authorized')
  // // 3. Not logged into Facebook and can't tell if they are logged into
  // //    your app or not.
  // //
  // // These three cases are handled in the callback function.

  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  // });

  // };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
