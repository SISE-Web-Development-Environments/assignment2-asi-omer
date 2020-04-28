$(document).ready(function () {

  $("#signin").click(SignIn);
  $("#signup").click(SignUp);
  $(".returnToStart").click(ReturnToMain)
  localStorage.setItem("p", "p");


});
$(function () {
  $('input[type="range"]').on('input', function () {

    var control = $(this),
      controlMin = control.attr('min'),
      controlMax = control.attr('max'),
      controlVal = control.val(),
      controlThumbWidth = control.data('thumbwidth');

    var range = controlMax - controlMin;

    var position = ((controlVal - controlMin) / range) * 100;
    var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
    var output = control.next('output');

    output
      .css('left', 'calc(' + position + '% - ' + positionOffset + 'px)')
      .text(controlVal);

  });
});

function SignIn() {
  $("div").hide();
  $("#signindiv").show();
};

function SignUp() {
  $("div").hide();
  $("#signupdiv").show();
};

function ReturnToMain() {
  $("div").hide();
  $("#welcome").show();
};

function showOptions() {
  $("div").hide();
  $("#options").show();
  if (localStorage.getItem(document.getElementById("up_key").value) === null) {
    localStorage.setItem("up_key", "ArrowUp");
  }
  if (localStorage.getItem(document.getElementById("down_key").value) === null) {
    localStorage.setItem("down_key", "ArrowDown");
  }
  if (localStorage.getItem(document.getElementById("right_key").value) === null) {
    localStorage.setItem("right_key", "ArrowRight");
  }
  if (localStorage.getItem(document.getElementById("left_key").value) === null) {
    localStorage.setItem("left_key", "ArrowLeft");
  }
  document.getElementById("up_key").value = localStorage.getItem("up_key");
  document.getElementById("down_key").value = localStorage.getItem("down_key");
  document.getElementById("right_key").value = localStorage.getItem("right_key");
  document.getElementById("left_key").value = localStorage.getItem("left_key");
}

function getKey(event, id) {
  document.getElementById(id).value = event.code;
  localStorage.setItem(id, event.code);
}

function play(){
  
  sessionStorage.setItem("balls_num",document.getElementById("balls_num_o").innerText);
  sessionStorage.setItem("pts5_color",document.getElementById("pts5_color").style.backgroundColor);
  sessionStorage.setItem("pts15_color",document.getElementById("pts15_color").style.backgroundColor);
  sessionStorage.setItem("pts25_color",document.getElementById("pts25_color").style.backgroundColor);
  sessionStorage.setItem("game_time",document.getElementById("game_time_o").innerText);
  sessionStorage.setItem("monster_num",document.getElementById("monster_num_o").innerText);

  startGame()
 
}

function random(){
  

  //add randomation


  sessionStorage.setItem("balls_num",document.getElementById("balls_num_o").innerText);
  sessionStorage.setItem("pts5_color",document.getElementById("pts5_color").style.backgroundColor);
  sessionStorage.setItem("pts15_color",document.getElementById("pts15_color").style.backgroundColor);
  sessionStorage.setItem("pts25_color",document.getElementById("pts25_color").style.backgroundColor);
  sessionStorage.setItem("game_time",document.getElementById("game_time_o").innerText);
  sessionStorage.setItem("monster_num",document.getElementById("monster_num_o").innerText);

  startGame()
 
}

function startGame(){
  $("div").hide()
  $("#game").show()
  $("#score").show()
  $("#time").show()
  Start()
}


function checkCredantials() {
  if (localStorage.getItem(document.getElementById("sign_in_username").key) === null) {
    if (localStorage.getItem(document.getElementById("sign_in_username").value) == document.getElementById("sign_in_password").value) {
      showOptions()
    }
    else {
      alert("Please enter a valid credantials")
    }
  }
  else {
    alert("Please enter a valid credantials")
  }
}

function saveCredantials() {
  localStorage.setItem(document.getElementById("sign_up_username").value, document.getElementById("sign_up_password").value);
  //restore - document.getElementById("result").innerHTML = localStorage.getItem("lastname");
}

// Wait for the DOM to be ready
$(function () {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='registration']").validate({
    // Specify validation rules
    rules: {
      username: {
        required: true,
      },
      firstname: {
        required: true,
        noNumbers: true
      },
      lastname: {
        required: true,
        noNumbers: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6,
        mypassword: true
      },
      date: {
        required: true,
        date: true
      }
    },
    // Specify validation error messages
    messages: {
      username: "Please enter your username",
      firstname: {
        required: "Please enter your firstname",
      },
      lastname: {
        required: "Please enter your lastname"
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address",
      date: "Please enter a valid birthday"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {
      saveCredantials();
    }
  });

  $("form[name='login']").validate({
    // Specify validation rules
    rules: {
      username: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    // Specify validation error messages
    messages: {
      username: "Please enter your username",
      password: {
        required: "Please provide a password",
      },
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {
      checkCredantials()
    }
  });




});

$.validator.addMethod('mypassword', function (value, element) {
  return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
},
  'Password must contain at least one numeric and one alphabetic character.');

$.validator.addMethod('noNumbers', function (value, element) {
  return this.optional(element) || (value.match(/[a-zA-Z]/) && !value.match(/[0-9]/));
},
  'Password must contain at only alphabetic characters.');

