const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  event.preventDefault();
  const li = event.target.parentElement;
  //   console.log(li.id);
  todos = todos.filter((todo) => {
    console.log(li.id, todo.id);
    console.log(parseInt(li.id) !== todo.id);
    return parseInt(li.id) !== todo.id;
  });
  console.log(todos);
  saveTodos();
  li.remove();
}

function showTodo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  };
  todos.push(newTodoObj);
  saveTodos();
  showTodo(newTodoObj);
}

toDoForm.addEventListener("submit", handleTodoSubmit);

function loadTodos() {
  const savedTodos = localStorage.getItem(TODOS_KEY);
  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    parsedTodos.forEach(showTodo);
    return parsedTodos;
  } else {
    return [];
  }
}

todos = loadTodos();
