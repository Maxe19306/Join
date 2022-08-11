setURL('https://gruppe-289.developerakademie.net/Join/smallest_backend_ever');


let title;
let date;
let prio;
let categorie;
let description;
let creator;
let currentDraggedElement;


async function loadBoard() {
    await downloadFromServer();
    console.log('tasks', allTask);
    loadAllFilter();
}


function loadAllFilter() {
    let currentToDo = allTask.filter(t => t['state'] == 'todo');
    let currenInProgress = allTask.filter(t => t['state'] == 'in-progress');
    let currentTesting = allTask.filter(t => t['state'] == 'testing');
    let currentDone = allTask.filter(t => t['state'] == 'done');
    document.getElementById('todo').innerHTML= '';
    document.getElementById('in-progress').innerHTML= '';
    document.getElementById('testing').innerHTML= '';
    document.getElementById('done').innerHTML= '';
    filterTodoTask(currentToDo);
    filterInProgress(currenInProgress);
    filterTesting(currentTesting);
    filterInProgress(currentDone);
}

function filterTodoTask(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let index = currentToDo[i];
        let typeToDo = 'todo';
        document.getElementById('todo').innerHTML += htmlTicket(i, index, typeToDo);
    }
}


function filterInProgress(currenInProgress) {
    for (let i = 0; i < currenInProgress.length; i++) {
        let index = currenInProgress[i];
        let typeInProgress = 'in-progress';
        document.getElementById('in-progress').innerHTML += htmlTicket(i, index, typeInProgress);
    }
}


function filterTesting(currentTesting) {
    for (let i = 0; i < currentTesting.length; i++) {
        let index = currentTesting[i];
        let typeTesting = 'testing';
        document.getElementById('testing').innerHTML += htmlTicket(i, index, typeTesting);
    }
}


function filterInProgress(currentDone) {
    for (let i = 0; i < currentDone.length; i++) {
        let index = currentDone[i];
        let typeDone = 'done';
        document.getElementById('done').innerHTML += htmlTicket(i, index, typeDone);
    }
}

/*
function renderBoard(i, array, ticket) {
        title = array[i]['title'];
        date = array[i]['date'];
        prio = array[i]['prio'];
        categorie = array[i]['categorie'];
        description = array[i]['description'];
        creator = array[i]['creator'];
        id = array[i]['id'];
        ticket.innerHTML += htmlTicket(i);
}*/


function moveto(i) {
    let array = allTask.find(t => t.creator === currenDraggedElement);
    array['state'] = i;
    htmlTicket();
}


function deleteTaskOnBoard(i) { 
    backend.deleteItem('allTask', i);
    renderBoard();
}


function startdragging(i) {
    currentDraggedElement = i;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function htmlTicket(i, index, type) {
    return /*html*/`
        <div id="${i}${type}" draggable="true" ondragstart="startdragging(${index['creator']})" class="ticket-color">
            <div class="ticket word-wrap">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img class="img-25 mr-10 object-fit" src="img/placeholder.png" alt="">
                        <div>
                           Name 
                        </div>
                    </div>
                    <div class="d-flex align-center">
                        <div>
                            <img class="mr-10 img-25" src="img/icons8-calendar-150.png" alt="">
                        </div>
                        <span>
                            ${ index['date']}
                        </span>
                    </div>
                </div>
                <div class="mt-10">
                    <b>
                        ${index['title']}
                    </b>
                </div>
                <span>
                    ${index['description']}
                </span>
                <div class="category-board word-wrap bg-blue">
                    <span>
                        ${index['categorie']}
                    </span>
                </div>
                <div class="category-board word-wrap bg-blue">
                    <span>
                        ${index['prio']}
                    </span>
                </div>
                <button onclick="deleteTaskOnBoard()">
                    Löschen
                </button>
            </div>
        </div>
    `;
}



