const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-input");
const toDoList = document.getElementById("todo-list");
const deleteBtn = document.querySelector("#deleteBtn");

const HIDDEN_CLASS = "hidden";

let toDos = [];

const TODOS_KEY = "todos";

function hideDeleteBtn (){
        deleteBtn.classList.add(HIDDEN_CLASS);
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}



function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((element) => element.id !== parseInt(li.id));
    saveToDos();

    if(toDos[0] === undefined){
    hideDeleteBtn();
    }
}

function paintTodo(newToDoObj) {
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    span.innerText = newToDoObj.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.id = "deleteBtn";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {id: Date.now(), text: newToDo}
    toDos.push(newToDoObj);
    paintTodo(newToDoObj);
    saveToDos();
        if (toDos[1] !== undefined) {
            deleteBtn.classList.remove(HIDDEN_CLASS);
        }
        console.log(toDos);
}

function checkLocalStorage() {

}

document.addEventListener("click", checkLocalStorage);
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos === null) {
       hideDeleteBtn();
} else if (JSON.parse(savedToDos)[0] !== undefined) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
} else {
    hideDeleteBtn();
}


//기본은 delete button이 보인다.
//마지막 li 지우면 delete button 이 사라진다. 이거는 deleteToDo function 에 적어놨다.
//이제는 새로 입력할 때 delete button이 생성되게 하면 된다.
//deleteAll 기능도 추가해야된다.

//overflow 추가하기




// function  removeLi (li){
//     if(li = null){

//     } else{
//         li.remove();
//         removeLi(li);
//     }
// }

// function deleteAllTodo (){
//     localStorage.removeItem("todos");
//     console.log(toDos);
//     const li = toDoList.querySelector("li")
//     removeLi(li);
// }


//todo-form 뒤에 appendChild로 넣자.