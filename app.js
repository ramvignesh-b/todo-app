//Date
const d = new Date();
document.querySelector('#date').innerText = d.toDateString();
//Variables

const bg = document.querySelector('body').style.backgroundImage;

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')
const itemCount = document.querySelector('#count')

//Event Listeners
document.addEventListener('DOMContentLoaded', loadTodo)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', removeTodo)
filterOption.addEventListener('click', filterTodo)

//Functions

function addTodo(event) {
    event.preventDefault(); // prevents form submit

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Save to Local
    saveLocal(newTodo.innerText);
    //Check Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    //Reset the input field
    todoInput.value = "";
}

function removeTodo(event) {
    const item = event.target;
    //Delete ToDo Item
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
        removeLocalTodo(todo);

    }
    if (item.classList[0] === 'complete-btn') {
        const todoItem = item.parentElement;
        todoItem.classList.toggle('complete');
        //todoItem.children[0].style.textDecoration = "line-through";
    }
}

const todos = todoList.childNodes;
function filterTodo(event) {
    let count = 0;
    todos.forEach(function (item) {
        switch (event.target.value) {
            case "all":
                item.style.display = "flex";
                count++;
                break;
            case "completed":
                if (item.classList.contains("complete")) {
                    item.style.display = "flex";
                    count++;
                }
                else {
                    item.style.display = "none";
                }
                break;
            case "incomplete":
                if (!item.classList.contains("complete")) {
                    item.style.display = "flex";
                    count++;
                }
                else {
                    item.style.display = "none";
                }
                break;
        }
    })
    itemCount.innerText = 'Found ' + count + ' items';
}

function saveLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodo(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Add a list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Check Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    })
    
}

function removeLocalTodo(todo){
    let todos = JSON.parse(localStorage.getItem("todos"));
    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function hover(param) {
    if (param === 'mousein') {
        document.querySelector('body').style.backgroundImage = "linear-gradient(120deg, rgba(20, 20, 20,0.8), rgba(20, 40, 60,0.8))";
    }
    else if (param === 'mouseout') {
        document.querySelector('body').style.backgroundImage = bg;
    }
}