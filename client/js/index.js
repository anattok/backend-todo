// const titleInput = document.querySelector(".title");
// const authorInput = document.querySelector(".author");
// const textInput = document.querySelector(".textarea");
// const buttonSend = document.querySelector(".button");

// const wrap = document.querySelector(".wrap");

// const url = "http://127.0.0.1:5000/";// url сервера 

// const obj = {};

// buttonSend.addEventListener("click", (e) => {
//   e.preventDefault();
//     obj.author = authorInput.value;
//     obj.title = titleInput.value;
//     obj.content = textInput.value;

//   const jsonBody = (JSON.stringify(obj));

//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: jsonBody,
//     // mode: "no-cors"
//   }).then((response) => console.log(response));
//     // .then((data) => console.log(data));
  
// });


const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const textInput = document.querySelector(".textarea");
const buttonSend = document.querySelector(".button");

const wrap = document.querySelector(".wrap");

const url = "http://127.0.0.1:5000/api"; // url сервера

const obj = {};

buttonSend.addEventListener("click", (e) => {
  e.preventDefault();
  obj.author = authorInput.value;
  obj.title = titleInput.value;
  obj.content = textInput.value;

  const jsonBody = JSON.stringify(obj);

  const res = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: jsonBody,
  })

    .then((res) => res.json())
    .then((data) => console.log(data));
});