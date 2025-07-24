let url = "https://tarmeezacademy.com/api/v1";
let pag = 1;
let page = 1;
// alerte()
function daata(pag) {
  fetch(`${url}/posts?limit=40&page=${pag}`)
    .then((res) => res.json())
    .then((data) => {
      custom(false)
      let postUser = data.data;
      let posts = document.querySelector(".posts");
      for (const post of postUser) {
        let tit = "";
        if (post.title != null) {
          tit = post.title;
        } else {
          tit = "Welcome";
        }
      
       
        let id_user = "";
        if (localStorage.user == null) {
          id_user = "";
        } else {
          id_user = JSON.parse(localStorage.user);
        }
        let str = "";
        if (id_user.id === post.author.id) {
          str = `
       <i class="fa-solid fa-bars" onclick='getbox()' ></i>
             <ul class="btnbox" >
                            <li onclick='Updata(${post.id})'><i class="fa-solid fa-pencil " ></i> Updata</li>
                            <li  onclick='delet(${post.id})'  ud><i class="fa-solid fa-trash-can" ></i> delete</li>
                         </ul>
       `;
        } else {
          str = "";
        }
        posts.innerHTML += `
         <div class="psot" onclick='get(${post.id})'>
                    <div class="portflie">
                    <div class="img" >
                            <img src=${post.author.profile_image} onclick='get(${post.id}),setid()'  onerror="this.src='img/cc.jpg';" >
                            <h2 onclick='setid()' class="click"><i class="fa-solid fa-circle-check"></i> <em> ${post.author.username}</em></h2>
                            </div>
                         ${str}
                    </div>
                    <div class="imges">
                        <img src=${post.image}   onerror="this.src='img/no image.jpg';">
                    </div>
                    <div class="time">
                    ${post.created_at}
                    </div>
                    <div class="text">
                        <div class="head">
                            <h2><i class="fa-solid fa-medal"></i> <em>${tit}</em> <i class="fa-solid fa-medal"></i>
                            </h2>
                        </div>
                        <h4><em>${post.body}</em></h4>
                    </div>
                    <div class="comments"  onclick='getcommnt(${post.id})'>
                        <h4> <i class="fa-solid fa-comment"></i> Comments ( ${post.comments_count} )</h4>
                    </div>
                </div>
       `;
      }
    }).catch(error=>{
      custom(true);
    }
    )
}daata(pag);
function getdata() {
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;
  if (username != "" && password != "") {
    let params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${url}/login`, params)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("Token", data.token);
        alerte(true, "welcom to Msg ✔✔", "");
        setTimeout(() => {
          location.assign("index.html");
          valdie();
        }, 1300);
      })
  } else {
    alerte(true, "entre username et password :", "red");
  }
}
function valdie() {
  let btnlogin = document.querySelector(".logi");
  let useer = document.querySelector(".useer");
  let log = document.querySelector(".log");
  if (localStorage.Token != null) {
    let ff = JSON.parse(localStorage.user);
    log.style.display = "none";
    useer.innerHTML = `
 <img src=${ff.profile_image} 
   onerror="this.src='img/cc.jpg';"
 onclick='getuser(${ff.id}),setid()'>
    <i class='name_user chengcolor' onclick='getuser(${ff.id}),setid()'>${ff.username}</i>
    `;
    btnlogin.innerHTML = `
  <button class='btnsignup' onclick='SignupA()'>
                    <div class="button-outer">
                        <div class="button-inner">
                            <span><h4>Signup</h4></span>
                        </div>
                    </div>
`;
    let add = document.querySelector(".add");
    add.innerHTML = `
 <div class="addpost" onclick='btnaddpos()'>
            <h3>+</h3>
        </div>
`;
  } else {
    btnlogin.innerHTML = `  
                

    <button>
                <div class="button-outer">
                  <div class="button-inner">
                <span><a href="Register.html">Register</a></span>
                  </div>
                </div>
    </button>
    
    <button>
                <div class="button-outer">
                  <div class="button-inner">
                        <span><a href="login.html">login</a></span>
                  </div>
                </div>
    </button>
  `;
  }
}valdie();
window.onscroll = () => {
  custom(false);
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 800) {
    page = page + 1;
    daata(page);
    custom(true)
  }
}
function getcommnt(id) {
  let input_commmnts = "";
  if (localStorage.getItem("user") !== null) {
    input_commmnts = `
        <input type="text" placeholder="enter comments..." class="inputCommt">
        <i class="fa-solid fa-paper-plane " onclick='creatcomnt(${id})'></i>
    `;
  } else {
    input_commmnts = "";
  }
  let slaydr = document.querySelector(".slaydr");
  fetch(`${url}/posts/${id}`)
    .then((res) => res.json())
    .then((data) => {
      custom(false)
      scroll(0, 0);
      let conut;
      localStorage.setItem("post", JSON.stringify(data.data));
      let dataa = data.data;
      slaydr.style.display = "block";
    
      slaydr.innerHTML = "";
      for (const commt of dataa.comments) {

        let port = "";
        if (typeof commt.author.profile_image === "string") {
          port =commt.author.profile_image;
        } else {
          port = "img/cc.jpg";
        }
        conut += `
               <div class="usercoment">
                  <img src=${port}>
                  <h2>@${commt.author.username}</h2>
                  <p>${commt.body}</p>
              </div>
           `;
      }
      slaydr.innerHTML += `
         <h1><em>${dataa.author.username}</em></h1>
        <h2 class="COM">Comments</h2>
        <div class="uscom">
        ${conut}
        </div>
         <div class="inp">
       ${input_commmnts}
    </div>
          <div class="bttt">
        <button class="sundbtn">sund</button>
      </div>
      `;
      let bttt = document.querySelector(".bttt");
      bttt.onclick = () => {
        slaydr.style.display = "none";
      };
    }).catch(error=>{
      custom(true);
    }
    )
}
function creatcomnt(IP) {
  let inpp = document.querySelector(".inputCommt");
  let Tokenn = localStorage.Token;
  let parrams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Tokenn}`,
    },
    body: JSON.stringify({
      body: inpp.value,
    }),
  }; 
  if (inpp.value !== "") {
    custom(true);
    fetch(`${url}/posts/${IP}/comments`,parrams)
    .then(res=>res.json())
    .then(data=>{
      custom(false);
      getcommnt(IP); 
    })
  } else {
  
      alerte(true, "entrer une comments", "red");
       setTimeout(() => {
        alerte(false)
       }, 2000);
  }
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
  localStorage.setItem("id", idi);
  location.assign("putPost.html");
}
function get(di) {
  fetch(`${url}/posts/${di}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      localStorage.setItem("pos", JSON.stringify(data.data));
    });
}
function delet(iiiid) {
  let token = localStorage.Token;
  let paramss = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  custom(true);
  fetch(`https://tarmeezacademy.com/api/v1/posts/${iiiid}`, paramss)
    .then((res) => res.json())
    .then((data) => {
     
      alerte(true, " post is delete ✅", "");
      setTimeout(() => {
        custom(false);
        location.reload();
        
      }, 1440);
    });
}
  function SignupA() {  
  localStorage.removeItem("Token");
  localStorage.removeItem("user");
  alerte(true, "!user is signup 💨", "geen");
  setTimeout(() => {
    location.reload();
  }, 2000);
}
 function btnaddpos(){
  location.assign("addpost.html");
}
function setid(){
  custom(true);
 setTimeout(() => {
  location.assign("profile.html");
  custom(false);
 },1000);
}
function getuser(drid) {
  localStorage.removeItem("pos");
  localStorage.setItem("pos",drid);
}
  function custom(show=true) {
  let custom = document.querySelector(".custom-loader");
  if (show) {
    custom.style.opacity = "1";
  } else {
    custom.style.opacity = "0";
  }
}

function alerte(shoow=true,text,BG_Color) {
  let alertt = document.querySelector(".alert");
  let textt = document.querySelector(".alert i");
  if (shoow) {
    alertt.style.backgroundColor=BG_Color
    textt.innerHTML =text
    alertt.style.opacity= 1

  } else {
       alertt.style.opacity = "0";
  }
}
