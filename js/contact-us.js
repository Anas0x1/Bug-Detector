let message = document.getElementById('message');
let email = document.getElementById('email');
let submit = document.getElementById('submit-button');

let index = 0;
let datapro = [];

function getdata(){
  let newpro = {
    message: message.value,
    email: email.value,
  };
  if(message.value!=''&&email.value!=''){
  
  datapro[index++] = newpro;
  localStorage.setItem('User', JSON.stringify(datapro));
  message.value='';
  email.value='';
  }
  else alert("Enter the data first");
};
