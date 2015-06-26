//valdate login data

var logButton = $('#signIn');
var emailId = $('#email');
var passwordId = $('#password');
var email = emailId.val();
var password = passwordId.val();

//check if is empty
if(email === "" && password === "") {
   console.log('empty Data');
}else {
   console.log(5);
}
