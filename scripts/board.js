setURL('https://gruppe-289.developerakademie.net/Join/smallest_backend_ever');


async function loadBoard() {
    await downloadFromServer();
    console.log('tasks', allTask);
    loadAllFilter();
}


function loadAllFilter() {
    let currentToDo = allTask.filter(t => t['state'] == 'todo');
    let currenInProgress = allTask.filter(t => t['state'] == 'inProgress');
    let currentTesting = allTask.filter(t => t['state'] == 'testing');
    let currentDone = allTask.filter(t => t['state'] == 'done');
    document.getElementById('todo').innerHTML= '';
    document.getElementById('inProgress').innerHTML= '';
    document.getElementById('testing').innerHTML= '';
    document.getElementById('done').innerHTML= '';
    filterTodoTask(currentToDo);
    filterInProgress(currenInProgress);
    filterTesting(currentTesting);
    filterDone(currentDone);
}

function filterTodoTask(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let index = currentToDo[i];
        document.getElementById('todo').innerHTML += htmlTicket(i, index);
    }
}


function filterInProgress(currenInProgress) {
    for (let i = 0; i < currenInProgress.length; i++) {
        let index = currenInProgress[i];
        document.getElementById('inProgress').innerHTML += htmlTicket(i, index);
    }
}


function filterTesting(currentTesting) {
    for (let i = 0; i < currentTesting.length; i++) {
        let index = currentTesting[i];
        document.getElementById('testing').innerHTML += htmlTicket(i, index);
    }
}


function filterDone(currentDone) {
    for (let i = 0; i < currentDone.length; i++) {
        let index = currentDone[i];
        document.getElementById('done').innerHTML += htmlTicket(i, index);
    }
}


function moveto(i) {
    let array = allTask.find(t => t.createdAt === currentDraggedElement);
    array['state'] = i;
    loadAllFilter();
    pushAllTask();
}


async function deleteTaskOnBoard(index) {
    allTask.splice(index, 1); 
    await backend.deleteItem('allTask');
    loadAllFilter();
    pushAllTask();
}


function startdragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function hightlight(id) {
    let container = document.getElementById(id);
    if (container.className == "board-content") {
        container.className = "board-content";
      } else {
        container.className = "drag-area-hightlight";
      }
}


function htmlTicket(i, index) {
    return /*html*/`
        <div id="${i} ${index['state']}" draggable="true" ondragstart="startdragging(${index['createdAt']})" class="${index['categorie']} ticket-color cursorMove">
            <div class="ticket word-wrap">
                <div class="d-flex justify-content-between">
                    <div class="d-flex align-center">
                        <div>
                            <img class="mr-10 img-25" src="img/icons8-calendar-150.png" alt="">
                        </div>
                        <span>
                            ${ index['date']}
                        </span>
                    </div>
                    <div>
                        <svg onclick="deleteTaskOnBoard(${index, i})" class="trash-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path 
                                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
                        </svg>
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
                <div class="section-bottum">
                    <div class="d-flex">
                        <div class="category-board word-wrap bg-blue mr-10">
                            <span>
                                ${index['categorie']}
                            </span>
                        </div>
                        <div class="category-board word-wrap bg-blue">
                            <span>
                                ${index['prio']}
                            </span>
                        </div>
                    </div>
                    <div>
                        created by: ${index['creator']} ${index['SelectedEmployee']}
                    </div>
                </div>
            </div>
        </div>
    `;
}



