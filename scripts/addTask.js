let CurrentUsers = [
    [{
            'name': 'Olaf Mueller',
            'e-mail': 'Olafmueller@fakeSale.com',
        }, {

            'name': 'Peter Maurer',
            'e-mail': 'Petermaurer@fakeSale.com',
        }, {

            'name': 'Thomas',
            'e-mail': 'Thomas_ketler@web.de',
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


function EmployeePicker() {
    document.getElementById('avatarPicker').innerHTML = '';
    for (let i = 0; i < CurrentUsers[0].length; i++) {
        const user = CurrentUsers[0][i];
        document.getElementById('avatarPicker').innerHTML += /*html*/ `<option id="MA${i}" onclick="SelectEmployee(${i})"> ${user['name']} </option>`;
    }

}


function SelectEmployee(i) {
    SelectedEmployee = '';
    SelectedEmployeeEmail = '';
    SelectedEmployee = document.getElementById(`MA${i}`).innerHTML;
    SelectedEmployeeEmail = CurrentUsers[0][i]['e-mail'];
    console.log(SelectedEmployeeEmail);
    document.getElementById('createdButton').disabled = false;
    document.getElementById('createdButton').classList.add('createButtonhover');
}


function updateCurrentUsers() {
    CurrentUsers.splice(CurrentUsers);
    let hallo = document.getElementById('categorie').value;
    CurrentUsers.push(allEmployees[`${hallo}`]);
    console.log(CurrentUsers);
}


async function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let categorie = document.getElementById('categorie').value;
    let prio = document.getElementById('prio').value;
    let description = document.getElementById('description').value;
    let creator = currentUser[0]['name'];

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
    await backend.setItem('task', JSON.stringify(allTask));
    console.log('gerade erstellt', allTask);
    blankForm();

}


function blankForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}


function loadAllTask() {
    allTask = JSON.parse(backend.getItem('task')) || [];
}