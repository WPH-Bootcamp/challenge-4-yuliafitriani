"use strict";

const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random().toString(36).substring(2, 9);
  let uniqid = timeStamp.toString() + randomNumber;
  return uniqid;
}

function addTodo() {
  const todoText = prompt("Add todo : ");

  if (todoText.trim() != "") {
    const todo = {
      id: generateUniqueId(),
      text: todoText,
      isCompleted: false,
    };

    todos.push(todo);

    if (todos.length > 0) {
      console.log("to-do successfully added 🎉");
    }
  }
}

function markTodoCompleted() {
  listTodos();

  let number = prompt("to-do number to complete : ");
  number = parseInt(number);
  if (typeof number === "number") {
    let index = number - 1;

    if (todos[index]) {
      let todo = todos[index];

      todo.isCompleted = true;

      console.log(`to-do ${todo.text} has been completed 🎉`);
    } else {
      console.log("Invalid number. Please enter a valid number from the list.");
    }
  }
}

function deleteTodo() {
  listTodos();

  let number = prompt("to-do number to delete : ");
  if (number.trim() !== "") {
    number = parseInt(number);
    if (typeof number === "number") {
      let index = number - 1;

      if (todos[index]) {
        delete todos[index];
        console.log("to-do has been deleted");
      } else {
        console.log(
          "Invalid number. Please enter a valid number from the list."
        );
      }
    }
  } else {
    console.log("Invalid number. Please enter a valid number from the list.");
  }
}

function listTodos() {
  console.log("---YOUR TO-DO LIST---");

  if (todos.length > 0) {
    todos.forEach((todo, index) => {
      let status = "[ACTIVE]";

      if (todo.isCompleted) {
        status = "[DONE]";
      }

      let i = 1 + index;
      console.log(`${i}. ${status} | ${todo.text}`);
    });
  } else {
    console.log("No to-dos to display.");
  }
}

function runTodoApp() {
  let running = true;
  while (running) {
    const menu = prompt("Choose menu [add, complete, delete, list, exit] : ");

    switch (menu) {
      case "add":
        addTodo();
        break;
      case "complete":
        markTodoCompleted();
        break;
      case "delete":
        deleteTodo();
        break;
      case "list":
        listTodos();
        break;
      default:
        console.log("please choose one of menu");
    }

    if (menu == "exit") {
      console.log("Exit application, Bye-bye");
      break;
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
