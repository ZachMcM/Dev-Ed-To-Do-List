//Selectors 
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filterTodo');
const signInContainer = document.querySelector('.sign-in-container');
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const signInBtn = document.querySelector('.sign-in-btn');
const mainContainer = document.querySelector('.main-container');
const failedSignIn = document.querySelector('.failed-sign-in');

//Listeners
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
signInBtn.addEventListener("click", loadList);

//Functions

function loadList() {
    if (username.value == "zachmcmullen04" && password.value == "Zachmoney#2") {
        mainContainer.style.display = "block";
        signInContainer.style.display = "none";
    } else {
        mainContainer.style.display = "none";
        failedSignIn.style.display = "flex";
    }
}

function addTodo(event) {
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todoItem')
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completeBtn');
    todoDiv.appendChild(completedButton);
    //Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trashBtn');
    todoDiv.appendChild(trashButton);
    //Append to ul
    todoList.appendChild(todoDiv);
    //Clear todoInput value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if (item.classList[0] === 'trashBtn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === 'completeBtn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach (function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
        case 'completed':
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';

                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todoItem')
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completeBtn');
    todoDiv.appendChild(completedButton);
    //Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trashBtn');
    todoDiv.appendChild(trashButton);
    //Append to ul
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //check
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}








