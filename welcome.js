$(document).ready(function () {

  $("#signin").click(SignIn);
  $("#signup").click(SignUp);
  $(".returnToStart").click(ReturnToMain)
  localStorage.setItem("p", "p");

  addEventListener(
		"keydown",
		function (e) {
			if(e.code == "Escape"){
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
      }
		}
	);


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
  $("#logo").show();
  $("#signindiv").show();
};

function SignUp() {
  $("div").hide();
  $("#logo").show();
  $("#signupdiv").show();
};



function ReturnToMain() {
  $("div").hide();
  $("#logo").show();
  $("#welcome").show();
};

function showOptions() {
  $("div").hide();
  $("#logo").show();
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
  var rand;

  localStorage.setItem("up_key", "ArrowUp");
  localStorage.setItem("down_key", "ArrowDown");
  localStorage.setItem("right_key", "ArrowRight");
  localStorage.setItem("left_key", "ArrowLeft");
  document.getElementById("up_key").value = localStorage.getItem("up_key");
  document.getElementById("down_key").value = localStorage.getItem("down_key");
  document.getElementById("right_key").value = localStorage.getItem("right_key");
  document.getElementById("left_key").value = localStorage.getItem("left_key");

  rand = Math.floor(Math.random() * 40) +50;
  document.getElementById("balls_num").value = rand;
  document.getElementById("balls_num_o").innerText = rand;
  sessionStorage.setItem("balls_num",document.getElementById("balls_num_o").innerText);
  
  document.getElementById("pts5_color").style.backgroundColor = random_rgba();
  sessionStorage.setItem("pts5_color",document.getElementById("pts5_color").style.backgroundColor);
  document.getElementById("pts15_color").style.backgroundColor = random_rgba();
  sessionStorage.setItem("pts15_color",document.getElementById("pts15_color").style.backgroundColor);
  document.getElementById("pts25_color").style.backgroundColor = random_rgba();
  sessionStorage.setItem("pts25_color",document.getElementById("pts25_color").style.backgroundColor);

  rand = Math.floor(Math.random() * 60) +60;
  document.getElementById("game_time").value = rand;
  document.getElementById("game_time_o").innerText = rand;
  sessionStorage.setItem("game_time",document.getElementById("game_time_o").innerText);

  rand = Math.floor(Math.random() * 4) + 1;
  document.getElementById("monster_num").value = rand;
  document.getElementById("monster_num_o").innerText = rand;
  sessionStorage.setItem("monster_num",document.getElementById("monster_num_o").innerText); 
}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function startGame(){
  $("div").hide()
  $("#logo").hide();
  $("#game").show()
  Start()
}


function checkCredantials() {
  if (localStorage.getItem(document.getElementById("sign_in_username").key) === null) {
    if (localStorage.getItem(document.getElementById("sign_in_username").value) == document.getElementById("sign_in_password").value) {
      lblUser.innerText = document.getElementById("sign_in_username").value;
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


