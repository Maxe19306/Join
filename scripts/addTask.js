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
    document.getElementById('NameFromEmployess').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const user = users[i]['name'];
        document.getElementById('NameFromEmployess').innerHTML += /*html*/ `<p id="MA${i}" onclick="SelectEmployee(${i})"> ${user} </p>`;
    }
}


function SelectEmployee(index) {
    for (let i = 0; i < users.length; i++) {
        document.getElementById(`MA${i}`).classList.remove('avatar-selected');
    }
    SelectedEmployee = '';
    SelectedEmployeeEmail = '';
    SelectedEmployee = document.getElementById(`MA${index}`).innerHTML;
    SelectedEmployeeEmail = users[index]['email'];
    console.log(SelectedEmployee);
    console.log(SelectedEmployeeEmail);
    document.getElementById('createdButton').disabled = false;
    document.getElementById('createdButton').classList.add('createButtonhover');
    document.getElementById(`MA${index}`).classList.toggle('avatar-selected');
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