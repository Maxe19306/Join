let allTask = [];
let SelectedEmployee;
let SelectedEmployeeEmail;


function EmployeePicker() {
    document.getElementById('NameFromEmployess').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const user = decrypt('salt', users[i]['name']);
        document.getElementById('NameFromEmployess').innerHTML += /*html*/ `<li class="employee" id="MA${i}" onclick="SelectEmployee(${i})"> ${user} </li>`;
    }
}


/**
 * 
 * @param {number} i 
 * 
 */
function SelectEmployee(i) {
    ResestSelectedAvatar();
    deleteSelectEmployee();
    SelectedEmployee = document.getElementById(`MA${i}`).innerHTML;
    SelectedEmployeeEmail = decrypt('salt', users[i]['email']);
    document.getElementById('createdButton').disabled = false;
    document.getElementById('createdButton').classList.add('createButtonhover');
    document.getElementById(`MA${i}`).classList.toggle('Employee-selected');
}

function deleteSelectEmployee() {
    SelectedEmployee = '';
    SelectedEmployeeEmail = '';
}

function ResestSelectedAvatar() {
    for (let index = 0; index < users.length; index++) {
        document.getElementById(`MA${index}`).classList.remove('Employee-selected');
    }
}

async function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let categorie = document.getElementById('categorie').value;
    let prio = document.getElementById('prio').value;
    let description = document.getElementById('description').value;
    let creator = currentUser[0]['name'];
    let creatorEmail = currentUser[0]['email'];

    let task = {
        'title': title,
        'date': date,
        'categorie': categorie,
        'prio': prio,
        'description': description,
        'creator': creator,
        'creatorEmail': creatorEmail,
        'createdAt': new Date().getTime(),
        'state': 'todo',
        'SelectedEmployee': SelectedEmployee,
        'SelectedEmployeeEmail': SelectedEmployeeEmail,
    }
    await taskPushToAllTask(task);
    blankForm();
    openBoard();
}

async function taskPushToAllTask(task) {
    allTask.push(task);
    await backend.setItem('task', JSON.stringify(allTask));
    console.log('gerade erstellt', allTask);
}



function openBoard() {
    window.open('board.html');
}


function blankForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}


function loadAllTask() {
    allTask = JSON.parse(backend.getItem('task')) || [];
}