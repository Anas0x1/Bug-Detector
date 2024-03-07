

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
img:exampleFormControlFile1.value,

};

blogs[index++]=New_blog;
localStorage.setItem('blogs',JSON.stringify(blogs));
exampleFormControlInput1.value='';
exampleFormControlTextarea1.value='';
exampleFormControlInput2.value='';
exampleFormControlFile1.value='';
show_Blogs();
});



 function show_Blogs ()
{
 let data="";
 for(let i=0;i<blogs.length;i++)
 {
      data+=`<div class="col-sm-3 mt-2 mb-2 colo">
      <div class="card p-2" >
          <img class="card-img-top" src="image/background.jpg" alt="image">
        
              <h6 class="card-text text-center mt-2 mb-2" >
                  ${blogs[i].title}
              </h6>
              
          
          <p class="card-text text-center mt-2 mb-2">
             ${blogs[i].content}
          </p>


          <div style="display: flex;justify-content: space-between; margin-top: 10px;">
            
              <small> <img src="image/user.png" alt="uers" style="width: 30px;height: 30px;"></small>
              <small>${blogs[i].tag}</small>
          </div>
          
      </div>
  </div>`
 }

 document.getElementById('blogs').innerHTML=data;

}
show_Blogs();