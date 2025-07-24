let file = document.querySelector(".file");
let Title = document.querySelector(".Title");
let Descreption = document.querySelector("textarea");
let btnCreate = document.querySelector(".Create");
btnCreate.onclick = function (e) {
  e.preventDefault();
  let url = "https://tarmeezacademy.com/api/v1/posts";
  let formdata = new FormData();
  formdata.append("body", Descreption.value);
  formdata.append("title", Title.value);
  formdata.append("image", file.files[0]);
  let token = localStorage.Token;
  let erro='';
  let params = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formdata,
  };
  fetch(url,params)
  .then(res=>res.json())
  .then(data=>{
    // console.log(data);
    // alert("post is accspt ✅");
    alerte(true, "post is accspt ✅", "");
    setTimeout(() => {
      location.assign('index.html')
    }, 2300);
  })
    .catch((error) => {
      // console.log(error);
      erro = error;
      // alert(erro)
      alerte(true, erro, "red");
    });
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