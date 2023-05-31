const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const textInput = document.querySelector(".textarea");
const buttonSend = document.querySelector(".button");

const wrap = document.querySelector(".wrap");

const url = "http://127.0.0.1:5000/";// url сервера 

const obj = {};

buttonSend.addEventListener("click", (e) => {
  e.preventDefault();
    obj.author = authorInput.value;
    obj.title = titleInput.value;
    obj.content = textInput.value;

  const json = (JSON.stringify(obj));

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
    mode: "no-cors"
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  
});
