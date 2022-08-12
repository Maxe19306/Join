let CurrentUsers = [
    [{
            'name': 'Olaf Mueller',
            'e-mail': 'Olafmueller@fakeSale.com',
        }, {

            'name': 'Peter Maurer',
            'e-mail': 'Petermaurer@fakeSale.com',
        }, {

            'name': 'Thomas Sale',
            'e-mail': 'ThomasSale@fakeSale.com',
        },
        {
            'name': 'Ulrike Sale',
            'e-mail': 'UlrikeSale@fakeSale.com',
        },
    ]
];
let allEmployees = {
    'Sale': [{
            'name': 'Olaf Mueller',
            'e-mail': 'Olafmueller@fake.com',
        }, {

            'name': 'Peter Maurer',
            'e-mail': 'Petermaurer@fake.com',
        }, {

            'name': 'Ulrike Sale',
            'e-mail': 'OlafSale@fake.com',
        },
        {
            'name': 'Ulrike Sale',
            'e-mail': 'OlafSale@fake.com',
        },
    ],
    'Product': [{
            'name': 'Olaf Product',
            'e-mail': 'OlafSale@fake.com',
        },
        {

            'name': 'Olaf Product',
            'e-mail': 'OlafSale@fake.com',
        }, {

            'name': 'Peter Product',
            'e-mail': 'OlafSale@fake.com',
        }, {
            'name': 'Ulrike Product',
            'e-mail': 'OlafSale@fake.com',
        },
    ],
    'Marketing': [{
            'name': 'Olaf Marketing',
            'e-mail': 'OlafSale@fake.com',
        },
        {
            'name': 'Olaf Marketing',
            'e-mail': 'OlafSale@fake.com',
        }, {

            'name': 'Peter Marketing',
            'e-mail': 'PeterMarketing@fake.com',
        }, {

            'name': 'Ulrike Marketing',
            'e-mail': 'OlafSale@fake.com',
        },
    ]

}
let allTask = [];
let SelectedEmployee;
let SelectedEmployeeEmail;

function Mitarbeiter() {
    document.getElementById('avatarPicker').innerHTML = '';
    for (let i = 0; i < CurrentUsers[0].length; i++) {
        const user = CurrentUsers[0][i];

        document.getElementById('avatarPicker').innerHTML += /*html*/ `<option id="MA${i}" onclick="blub(${i})"> ${user['name']} </option>`;
    }

}

function blub(i) {
    SelectedEmployee = '';
    SelectedEmployeeEmail = '';
    SelectedEmployee = document.getElementById(`MA${i}`).innerHTML;
    SelectedEmployeeEmail = CurrentUsers[0][i]['e-mail'];
    console.log(SelectedEmployeeEmail);
    document.getElementById('createdButton').disabled = false;
    document.getElementById('createdButton').classList.add('createButtonhover');
}

function hallo() {
    CurrentUsers.splice(CurrentUsers);
    let hallo = document.getElementById('categorie').value;
    CurrentUsers.push(allEmployees[`${hallo}`]);
    console.log(CurrentUsers);
}

function viewName(i) {
    document.getElementById('AssignedName').innerHTML += `${CurrentUsers[0][i]['name']}`;
    selectUser(i);
}

function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let categorie = document.getElementById('categorie').value;
    let prio = document.getElementById('prio').value;
    let description = document.getElementById('description').value;
    let creator = currentUser;

    let task = {
        'title': title,
        'date': date,
        'categorie': categorie,
        'prio': prio,
        'description': description,
        'creator': creator,
        'createdAt': new Date().getTime(),
        'state': 'todo',
        'SelectedEmployee': SelectedEmployee,
        'SelectedEmployeeEmail': SelectedEmployeeEmail,
    }
    allTask.push(task);
    console.log('gerade erstellt', allTask);
    blankForm();
    pushAllTask();
}


function blankForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function pushAllTask() {
    let allTaskAsString = JSON.stringify(allTask);
    backend.setItem('allTasks', allTaskAsString);
}


function loadAllTask() {
    let allTaskAsString = backend.getItem('allTasks');
    allTask = JSON.parse(allTaskAsString);
}