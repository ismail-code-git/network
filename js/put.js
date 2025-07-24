let Title_1 = document.querySelector(".Title_1");
let text_1 = document.querySelector(".text_1");
let file_1 = document.querySelector(".file_1");
let id_user = JSON.parse(localStorage.user);
let post_local = JSON.parse(localStorage.pos);
let ttoken = localStorage.Token;
Title_1.value = post_local.title;
text_1.value = post_local.body;
file_1.files.name = post_local.image;
custom(false);
let UPload = document.querySelector(".UPload");
UPload.addEventListener("click", (event) => {
  event.preventDefault();
  custom(true);
  let idii = localStorage.id;
  let formdataaa = new FormData();
  formdataaa.append("_method", "PUT");
  formdataaa.append("title", Title_1.value);
  formdataaa.append("body", text_1.value);
  formdataaa.append("image", file_1.files[0]);
  let paramss = {
    method: "POST",
    body: formdataaa,
    headers: {
      Authorization: `Bearer ${ttoken}`,
    },
  };
  fetch(`https://tarmeezacademy.com/api/v1/posts/${idii}`, paramss)
    .then((res) => res.json())
    .then(data=>{
      console.log(data.data);
      alerte(true, "! post is pload", "");
      custom(false);
      setTimeout(() => {
        location.assign('index.html') 
      
      }, 1300);
       
    })
});
function custom(show = true) {
  let custom = document.querySelector(".custom-loader");
  if (show) {
    custom.style.opacity = "1";
  } else {
    custom.style.opacity = "0";
  }
}
function alerte(shoow = true, text, BG_Color) {
  let alertt = document.querySelector(".alert");
  let textt = document.querySelector(".alert i");
  if (shoow) {
    alertt.style.backgroundColor = BG_Color;
    textt.innerHTML = text;
    alertt.style.opacity = 1;
  } else {
    alertt.style.opacity = "0";
  }
}