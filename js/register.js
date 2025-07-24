
let Name = document.querySelector(".name");
let password = document.querySelector(".pass");
let userName = document.querySelector(".email");
let btnRegister = document.querySelector(".btnn");
let profile_image = document.querySelector(".profile_image");
btnRegister.onclick = function (e) {
  e.preventDefault();
  let formdata = new FormData();
  formdata.append("username", userName.value);
  formdata.append("password", password.value);
  formdata.append("name", Name.value);
  formdata.append("image", profile_image.files[0]);
  let params = {
    method: "POST",
    body: formdata
  };
  fetch("https://tarmeezacademy.com/api/v1/register", params)
    .then((res) => res.json())
    .then((data) => {
      if (data!== null ) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("Token", data.token);
        alerte(true, "welcom to Msg ✅", "");
        setTimeout(() => {
          location.assign("index.html");
          
        }, 1300);
        // alert("welcom to Msg ✅");
      } else {
        // alert( "error ❌");
        alerte(true, "error ❌", "red");
      }
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