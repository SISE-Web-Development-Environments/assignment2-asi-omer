$(document).ready(function ()
{

   $("#signin").click(SignIn);


   $("#signup").click(SignUp);


});

function SignIn(){
    $("div").hide();
    $("#signindiv").show();
};

function SignUp(){
    $("div").hide();
};