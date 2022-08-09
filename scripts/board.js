


/*
function moin() {
    for (let i = 0; i < users.length; i++) {
        let name = decrypt('salt', users[i]['name']);
        document.getElementById('todo').innerHTML = `
        console.log('name', name);
    }
}*/


async function loadBoard() {
    await downloadFromServer();
    addUserToBoard();
}


function addUserToBoard() {
    for (let i = 0; i < users.length; i++) {
        let boardUser = decrypt('salt', users[i]['name']);
        console.log('name', boardUser);
        renderBoard(boardUser);
    }
}


function renderBoard(boardUser) {
    for (let i = 0; i < allTask.length; i++) {
        let task = allTask[i];
        let title = task['title'];
        let date = task['date'];
        let prio = task['prio'];
        let categorie = task['categorie'];
        let description = task['description'];
        document.getElementById('todo').innerHTML += /*html*/`
        <div class="ticket-color">
            <div class="ticket word-wrap">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img class="img-25 mr-10" src="img/placeholder.png" alt="">
                        <div>
                           ${boardUser} 
                        </div>
                    </div>
                    <div class="d-flex align-center">
                        <div>
                            <img class="mr-10 img-25" src="img/icons8-calendar-150.png" alt="">
                        </div>
                        <span>
                            ${i, date}
                        </span>
                    </div>
                </div>
                <div class="mt-10">
                    <b>
                        ${i, title}
                    </b>
                </div>
                <span>
                    ${i, description}
                </span>
                <div class="category-board word-wrap bg-blue">
                    <span>
                        ${categorie}
                    </span>
                </div>
                <div class="category-board word-wrap bg-blue">
                    <span>
                        ${prio}
                    </span>
                </div>
            </div>
        </div>`;
    }
}



