let btn_scan=document.getElementById('btn-scan');

let input=document.getElementById('input');

let show_scan=document.getElementById('show-scan');


btn_scan.addEventListener('click',function(){

    if(input.value!="")
    { 
        input.value="";
        show_scan.style.display = "block";
    }
    else
    {
        
        alert('Enter your target first');
    }





});
