let body5 = document.querySelector("#body5");
let user_profil = JSON.parse(localStorage.pos);
let id;
if (user_profil.author !== undefined) {
  id = user_profil.author.id;
} else {
  id = user_profil;
}
let content = document.querySelector(".card-container");
let blocke = document.querySelector(".posts_entre_profile .postss");
async function git_user() {
let user=await fetch(`https://tarmeezacademy.com/api/v1/users/${id}`)
let datatouser=await user.json()
    let Data = datatouser.data;
    custom(false);
    content.innerHTML = `
            <a href="index.html">
                <h3 class="fliche" > <i class="fa-solid fa-arrow-left"></i> home</h3>
            </a>
        <span class="pro">PRO</span>
        <img class="round" src=${Data.profile_image}
         onerror="this.src='img/cc.jpg';"
        >
        <h3>  <i class="fa-solid fa-circle-check"></i>  ${Data.username}</h3>
        <div class="buttons">
            <div class="nu_commt">
                <h3>Cmments</h3>
                ${Data.comments_count}
            </div>
            <div class="numpost">
                <h3>Posts</h3>
                ${Data.posts_count}
            </div>
        </div>
        <div class="skills">
        <h6>Posts</h6>
        <div class='boxss'>
        </div>
</div>
`;
    let boxss = document.querySelector(".boxss");
   let imguser =await fetch(`https://tarmeezacademy.com/api/v1/users/${id}/posts`);
   let res = await imguser.json()
        let Dat = res.data;
        console.log(Dat);
        for (let ele of Dat) {
          boxss.innerHTML += `
       <div class='box'>
                <img  src=${ele.image} onclick='getiid(${ele.id})'
                 onerror="this.src='img/no image.jpg' 
                 " >
               </div>
       `;
        }
}
git_user()
 async function getiid(id) {
    custom(true);
  let requist=await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`)
       let dat= await requist.json()
      custom(false);
      let DATA = dat.data;
      id_ser = "";
      if (localStorage.user == null) {
        id_ser = "";
      } else {
        id_ser = JSON.parse(localStorage.user);
      }
      let strr = "";
      if (id_ser.id === DATA.author.id) {
        strr = `
       <i class="fa-solid fa-bars" onclick='getbox()' ></i>
             <ul class="btnbox" >
                            <li onclick='Updata(${DATA.id})'><i class="fa-solid fa-pencil " ></i> Updata</li>
                            <li  onclick='delet(${DATA.id})'><i class="fa-solid fa-trash-can" ></i> delete</li>
                         </ul>
       `;
      } else {
        strr = "";
      }
      blocke.innerHTML = `
        <div class="psot">
            <div class="sund" onclick="sunipe()" >
                            <em>sund</em>
                        </div>
                <div class="portflie">
                <div class="img" >
                        <img src=${DATA.author.profile_image} 
                         onerror="this.src='img/cc.jpg';"
                        >
                        <h2  class="click"><i class="fa-solid fa-circle-check"></i> <em> ${DATA.author.username}</em></h2>
                        </div>
                      ${strr}
                </div>
                <div class="imges  iimg">
                    <img src=${DATA.image}
                     onerror="this.src='img/no image.jpg';"
                    >
                </div>
                <div class="time">
                ${DATA.created_at}
                </div>
                <div class="text">
                    <div class="head">
                        <h2><i class="fa-solid fa-medal"></i> <em>${DATA.title}</em> <i class="fa-solid fa-medal"></i>
                        </h2>
                    </div>
                    <h4><em>${DATA.body}</em></h4>
                </div>
                <div class="comments">
                    <h4> <i class="fa-solid fa-comment"></i> Comments ( ${DATA.comments_count} )</h4>
                </div>
            
            </div>

       `;
      let body = document.querySelector("body");
      body5.style.display = "none";
      body.style.backgroundColor = "#28223F";
      blocke.style.display = "block";
}
 function sunipe() {
  blocke.style.display = "none";
  body5.style.display = "flex";
}
 async function delet(iiiid) {
  custom(true);
  let token = localStorage.Token;
  let paramss = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
 let req= await fetch(`https://tarmeezacademy.com/api/v1/posts/${iiiid}`, paramss)
   let data= await req.json()
      custom(false);
      location.reload();
}
 function getbox() {
  let btnbox = document.querySelectorAll(".btnbox");
  btnbox.forEach((ele) => {
    if (ele.style.display == "block") {
      ele.style.setProperty("display", "none", "important");
    } else {
      ele.style.setProperty("display", "block", "important");
      setTimeout(() => {
        ele.style.setProperty("display", "none", "important");
      }, 4000);
    }
  });
}
 function Updata(idi) {
  console.log(idi);
  localStorage.setItem("id", idi);
  location.assign("putPost.html");

}
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
