let exampleFormControlInput1=document.getElementById('exampleFormControlInput1');
let exampleFormControlTextarea1=document.getElementById('exampleFormControlTextarea1');
let exampleFormControlInput2=document.getElementById('exampleFormControlInput2');
let exampleFormControlFile1=document.getElementById('exampleFormControlFile1');
let Publish_btn=document.getElementById('Publish-btn');


let index=0;
let blogs=[];
Publish_btn.addEventListener('click',function(){

let New_blog={

title:exampleFormControlInput1.value,
content:exampleFormControlTextarea1.value,
tag:exampleFormControlInput2.value,
img:exampleFormControlFile1.files,

};

blogs[index++]=New_blog;
localStorage.setItem('blogs',JSON.stringify(blogs));
exampleFormControlInput1.value='';
exampleFormControlTextarea1.value='';
exampleFormControlInput2.value='';
exampleFormControlFile1.files='';

});

for(let i=0;i<blogs.length;i++)
{
    console.log(i);
}
