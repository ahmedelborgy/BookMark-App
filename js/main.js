
// // ----------------
var bookmarkName=document.getElementById('bookmarkName');
var bookmarkURL=document.getElementById('bookmarkURL');
var submitBtn=document.getElementById('submitBtn');
var tableContent=document.querySelector('#tableContent');
var modal=document.querySelector('.modal');
var modalContent=document.querySelector('.modal-content');
var btnClose=document.querySelector('.btn-close');

btnClose.addEventListener('click',function(e){
 
  modal.classList.replace('d-flex','d-none');
  e.stopPropagation()
})
modal.addEventListener('click',function(e){
modal.classList.replace('d-flex','d-none');
 

e.stopPropagation();
 
});
modalContent.addEventListener('click',function(e){
  modal.classList.replace('d-none','d-flex');
  e.stopPropagation();
})

var lisBookM;
if(localStorage.getItem('allBookM')!=null){
  lisBookM=JSON.parse( localStorage.getItem('allBookM'))
  displayBookM(lisBookM)
}
else{
  lisBookM=[];
}



submitBtn.addEventListener('click',function(){
  addBookMark();
  

})


// -------addBookMark()--------
function addBookMark(){

if(validationUrl() && validationName()){
  var singlBookM={
    pname:bookmarkName.value,
    pUrl:bookmarkURL.value
 
  }

  lisBookM.push(singlBookM);
  localStorage.setItem('allBookM',JSON.stringify(lisBookM));


  displayBookM(lisBookM);
  modal.classList.replace('d-flex','d-none')
}
else{
  
  modal.classList.replace('d-none','d-flex')
}


}

// ----------displayBookM(list)----------------------
function displayBookM(list){

  var str=' ';
for(var i=0;i<list.length;i++){
 
  str+=`<tr>
          <td>${i+1}</td>
          <td>${list[i].pname}</td>              
          <td>
          <a  href="${list[i].bookmarkURL}" target="_blank"
          class="btn btn-visit" data-index="0">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>

          </td>

          <td>
            <button class="btn btn-delete pe-2" data-index="0" onclick="deleteBookM(${i})"
            >
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td>
      </tr>
`
}

document.querySelector('#tableContent').innerHTML=str;
}


function deleteBookM(index){
var btnDelete=Array.from( document.querySelectorAll('.btn-delete') );

console.log(btnDelete);

btnDelete[index].classList.add('bg-white','border' , 'border-dark');

setTimeout(function(){

  lisBookM.splice(index,1);
  displayBookM(lisBookM);
  localStorage.setItem('allBookM',JSON.stringify(lisBookM));

},800)


}


function validationUrl(){
  // alert(bookmarkURL.value)
  var regx=
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

 


  var is_valid=regx.test(bookmarkURL.value);
if(is_valid==true){
  bookmarkURL.classList.add('is-valid');
  bookmarkURL.classList.remove('is-invalid')

 
}
else{
bookmarkURL.classList.remove('is-valid');
bookmarkURL.classList.add('is-invalid')


}
return is_valid;
}


function validationName(){
  // alert(bookmarkURL.value)
  var regx=/[a-zA-Z]{3,50}$/;
 


  var is_valid=regx.test(bookmarkName.value);
if(is_valid==true){
  bookmarkName.classList.add('is-valid');
  bookmarkName.classList.remove('is-invalid')

 
}
else{
bookmarkName.classList.remove('is-valid');
bookmarkName.classList.add('is-invalid')


}
return is_valid;
}