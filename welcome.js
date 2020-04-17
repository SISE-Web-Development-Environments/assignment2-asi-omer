$(document).ready(function () {

    $("#signin").click(SignIn);


    $("#signup").click(SignUp);

    $(".returnToStart").click(ReturnToMain)
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

function showOptions(){
    $("div").hide();
    $("#options").show();
}

// Wait for the DOM to be ready
$(function() {
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
        date:{
            required: true,
            date: true
        } 
      },
      // Specify validation error messages
      messages: {
        username: "Please enter your username",
        firstname:{
            required: "Please enter your firstname",
        },
        lastname:{
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
      submitHandler: function(form) {
        form.submit();
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
        submitHandler: function(form) {
        //   form.submit();
            showOptions();
        }
      });




  });

  $.validator.addMethod('mypassword', function(value, element) {
    return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
},
'Password must contain at least one numeric and one alphabetic character.');

$.validator.addMethod('noNumbers', function(value, element) {
    return this.optional(element) || (value.match(/[a-zA-Z]/) && !value.match(/[0-9]/));
},
'Password must contain at only alphabetic characters.');
    