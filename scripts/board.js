setURL('https://gruppe-289.developerakademie.net/Join/smallest_backend_ever');


async function loadBoard() {
    await downloadFromServer();
    console.log('tasks', allTask);
    loadAllFilter();
}


async function loadAllFilter() {
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


function htmlTicket(i, index) {
    return /*html*/`
        <div id="${i} ${index['state']}" draggable="true" ondragstart="startdragging(${index['createdAt']})" class="ticket-color">
            <div class="ticket word-wrap">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img class="img-25 mr-10 object-fit" src="img/placeholder.png" alt="">
                        <div>
                           ${currentUser[0]['name']} 
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
                <button onclick="deleteTaskOnBoard(${index, i})">
                    Löschen
                </button>
            </div>
        </div>
    `;
}



