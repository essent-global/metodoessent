const toggle = document.getElementById("mobileToggle");
const menu = document.getElementById("navMenu");

if(toggle){
toggle.addEventListener("click", ()=>{
menu.classList.toggle("show");
});
}
