var aboutUs = document.querySelector('.aboutUsBtn');
var bookTable = document.querySelector('.bookTableBtn');
var home = document.querySelector('.homeBtn');
var menu = document.querySelector('.menuBtn');


function changeFn(x) {
	console.log(x)
  var y=document.querySelector(".nav-bar");
  y.classList.toggle("display-class");
  x.classList.toggle("change");
  var z=document.querySelectorAll(".menu-line");
  for(var i=0;i<z.length;i++){
    z[i].classList.toggle("active");
  }
}

function changeActiveClass(element){
	aboutUs.classList.remove('active-button');
	aboutUs.parentElement.classList.remove('active-bar');

	bookTable.classList.remove('active-button');
	bookTable.parentElement.classList.remove('active-bar')

	home.classList.remove('active-button');
	home.parentElement.classList.remove('active-bar');

	menu.classList.remove('active-button');
	menu.parentElement.classList.remove('active-bar')

	document.querySelector(element).classList.add('active-button');
	document.querySelector(element).parentElement.classList.add('active-bar');
}

aboutUs.addEventListener('click',function(){changeActiveClass(".aboutUsBtn")});
bookTable.addEventListener('click',function(){changeActiveClass(".bookTableBtn")});
home.addEventListener('click',function(){changeActiveClass(".homeBtn")});
menu.addEventListener('click',function(){changeActiveClass(".menuBtn")});