let CurrentUsers = ['avatar1.png', 'avatar2.png', 'avatar3.png']
let allTask = []

function renderAvatarPicker() {
    document.getElementById('avatarPicker').innerHTML = '';
    for (let i = 0; i < CurrentUsers.length; i++) {
        const user = CurrentUsers[i];
        document.getElementById('avatarPicker').innerHTML += `<img id="user-${i}" src="img/avatars/${user}" class="avatar" onclick="selectUser(${i})">`

    }
    document.getElementById('avatarPicker').innerHTML += ` <img class="avatar" src="img/icon plus.png" alt="">`;
}

function selectUser(i) {

    let user = document.getElementById('user-' + i)
    user.classList.toggle('avatar-selected');
}


function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let categorie = document.getElementById('categorie').value;
    let prio = document.getElementById('prio').value;
    let description = document.getElementById('description').value;


    let task = {
        'title': title,
        'date': date,
        'categorie': categorie,
        'prio': prio,
        'description': description,
    }


    allTask.push(task);

    let allTaskAsString = JSON.stringify(allTask);
    backend.setItem('allTasks', allTaskAsString);
}

function loadAllTask() {
    let allTaskAsString = backend.getItem('allTasks');
    allTask = JSON.parse(allTaskAsString);
}