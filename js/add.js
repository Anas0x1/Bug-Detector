let container = document.getElementById('container');
let registerBtn = document.getElementById('register');
let loginBtn = document.getElementById('login');
let Sign_confirmPass=document.getElementById('Sign-confirmPass');
let Sign_pass=document.getElementById('Sign-pass');
let Sign_email=document.getElementById('Sign-email');
let Sign_name=document.getElementById('Sign-name');
let btn_sign_up=document.getElementById('btn-sign-up');
let Log_pass=document.getElementById('Log-pass');
let Log_email=document.getElementById('Log-email');
let btn_log_in=document.getElementById('btn-log-in');

let index_Sign=0;
let index_log=0;
let data_Sign=[];
let data_log=[];

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


btn_log_in.addEventListener('click',function(){


    let User={
        email:Log_email.value,
        password:Log_pass.value,
        };
if(User.email===''||User.password==='')
{
    alert('ALL filled must be filled out!');
}
else
{
    data_log[index_log++]=User;
    localStorage.setItem('User',JSON.stringify(data_log));
    Log_email.value='';
    Log_pass.value='';
}

        

});


btn_sign_up.addEventListener('click',function(){

let New_User={
name:Sign_name.value,
email:Sign_email.value,
password:Sign_pass.value,
confirm_pass:Sign_confirmPass.value,
};

if(New_User.name===''||New_User.email===''||New_User.password===''||New_User.confirm_pass==='')
{
    alert('ALL filled must be filled out!');
}
else if(New_User.password!=New_User.confirm_pass)alert('Password is not the same !');
else
{
    data_Sign[index_Sign++]=New_User;
    localStorage.setItem('New User',JSON.stringify(data_Sign));
    Sign_confirmPass.value='';
    Sign_email.value='';
    Sign_name.value='';
    Sign_pass.value='';
}

});

