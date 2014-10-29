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



  $('#fb-button').on('click', function(e) {
    e.preventDefault();

    FB.login(function(response) {
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    }, {scope: 'public_profile,email'});
  });

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
      console.log(response);
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // Autorizado com sucesso
    // Ocultar o botão de login agora que o usuário está autorizado, por exemplo:
    // console.log(authResult);
    jQuery.getJSON('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+authResult['access_token'])
      .done(function(data){
        console.log(data);
      });
  } else if (authResult['error']) {
    // Ocorreu um erro.
    // Possíveis códigos de erro:
    //  "access_denied" - o usuário negou o acesso a seu aplicativo
    //   "immediate_failed" - não foi possível fazer o login do usuário automaticamente
    // console.log('There was an error: ' + authResult['error']);
  }
}

(function() {
  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

function render() {
  gapi.signin.render('google-button', {
    'callback': 'signinCallback',
    'clientid': "624317565694-vb4f0uers8hktak2a05t5j2slb0bod1u.apps.googleusercontent.com",
    'cookiepolicy': 'single_host_origin',
    'scope': 'https://www.googleapis.com/auth/userinfo.email'
  });
}
