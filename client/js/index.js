import { renderTask } from "./render.js";
import {
  todoInput,
  todoButton,
  todoButtonDelCompleted,
  todoButtonDelAll,
  todoList,
  todoMain,
} from "./create.js";

const urlApi = "http://127.0.01:5000/api/todos"; // url сервера

// const obj = {};

// buttonSend.addEventListener("click", (e) => {
//   e.preventDefault();
//   obj.author = authorInput.value;
//   obj.title = titleInput.value;
//   obj.content = textInput.value;

//   const jsonBody = JSON.stringify(obj);

// console.log(url);

// //выводим все туду
// const allTodos = () =>
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => console.log(data));

// allTodos();

// fetch(url).then((res) => console.log(res.json()));

//todo

async function getData() {
  const res = fetch(urlApi);
  return (await res).json();
}

//отправка
async function postData(url, data) {
  const response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: data,
  });

  return (await response).json();
}

//функция удаления всех задач
async function deleteData() {
  const response = fetch(urlApi, {
    method: "DELETE",
  });
  return (await response).json();
}

//измение одной по id
async function patchData(idTask) {
  const response = fetch(urlApi, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: idTask,
  });
  return await response.json();
}

//создаем задачу
async function createTask() {
  const task = {};
  task.text = todoInput.value.trim();
  task.checked = false;

  //object => json
  const jsonBody = JSON.stringify(task);

  if (todoInput.value.length) {
    await postData(urlApi, jsonBody);
  }

  todoInput.value = "";
  await render();
}

//отрисовываем список задач
async function render() {
  let tasks = await getData();

  todoList.innerHTML = "";

  tasks.forEach((task) => {
    renderTask(task.text, task._id, task.checked);
  });
  //если массив пустой - скрываем мэйн
  tasks.length
    ? todoMain.classList.remove("todo__hidden")
    : todoMain.classList.add("todo__hidden");
}

//удаляем все задачи
async function deleteAllTasks() {
  await deleteData();
  await render();
}

//меняем статус задачи на "выполнено" и наоборот
async function checkedTask(e) {
  if (e.target.classList.contains("todo__task-checkbox")) {
    const id = e.target.id;
    const jsonBody = JSON.stringify(id);

    await patchData(jsonBody);

    // const newTasks = tasks.map((obj) => {
    //   if (obj._id === id) {
    //     if (obj.checked === false) {
    //       obj.checked = true;
    //     } else {
    //       obj.checked = false;
    //     }
    //   }
    // });

    // const jsonBody = JSON.stringify(newTasks);
    // await postData(urlApi, jsonBody);
    // await render();
  }
}

// //удаляем чекнутые
function deleteCheckedTasks() {
  tasks = tasks.filter((obj) => obj.checked === false);
  setData();
  render();
}
// //удаляем таску
function deleteTask(e) {
  if (e.target.classList.contains("todo__task-del")) {
    const id = e.target.parentNode.parentNode.querySelector(
      ".todo__task-checkbox"
    ).id;

    tasks = tasks.filter((obj) => obj.id !== id);
    setData();
    render();
  }
}

function editTask(e) {
  if (e.target.classList.contains("todo__task-edit")) {
    //создаем инпут
    //создаем кнопку
    //создаем переменная для хранения текста
    const todoItemEditDone = document.createElement("button");
    todoItemEditDone.classList.add("todo__task-edit-done");
    todoItemEditDone.textContent = "✅";
    const input = document.createElement("input");
    input.classList.add("todo__input-edit");
    let text;

    //выбираем лейбл с текстом таски
    //забираем текст из лейбла
    const parentDiv = e.target.parentNode.parentNode;
    const label = parentDiv.querySelector(".todo__task-label");
    text = label.textContent;

    //находим родителя кнопок
    const todoBox = parentDiv.querySelector(".todo__box");

    //скрываем кнопку карандаша и лейбл
    e.target.classList.add("todo__hidden");
    label.classList.add("todo__hidden");

    //убираем активность всех остальных кнопок пока редактируется таска
    const checkboxAll = todoList.querySelectorAll(".todo__task-checkbox");
    const delBtnAll = todoList.querySelectorAll(".todo__task-del");
    const editBtnAll = todoList.querySelectorAll(".todo__task-edit");
    checkboxAll.forEach((elem) => {
      elem.disabled = true;
    });
    delBtnAll.forEach((elem) => {
      elem.disabled = true;
    });
    editBtnAll.forEach((elem) => {
      elem.disabled = true;
    });

    //добавляем кнопку галочку и инпут
    e.target.parentNode.prepend(todoItemEditDone);
    todoBox.append(input);

    //записываем в инпут текст из лeйбла
    input.value = text;

    todoItemEditDone.addEventListener("click", () => {
      //текст из инпута сохраняем в text
      const newText = input.value;
      text = newText;

      //удаляем созданные ноды
      input.remove();
      todoItemEditDone.remove();

      //показываем кнопку карандаша и лейбл
      label.classList.remove("todo__hidden");
      e.target.classList.remove("todo__hidden");

      //получаем айди таска
      const id = label.parentNode.firstChild.id;

      tasks.forEach((obj) => {
        if (obj.id === id) {
          obj.text = text;
        }
      });
      setData();
      render();
    });
  }
}

todoList.addEventListener("click", async (e) => {
  await checkedTask(e);
});

todoList.addEventListener("click", deleteTask);
todoList.addEventListener("click", editTask);
todoButton.addEventListener("click", createTask);
todoButtonDelAll.addEventListener("click", async () => {
  await deleteAllTasks();
});
todoButtonDelCompleted.addEventListener("click", deleteCheckedTasks);

await render();
