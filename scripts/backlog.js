async function loadBacklog() {
    await downloadFromServer();
    loadTaskToBacklog();
}


function loadTaskToBacklog() {
    let backlog = document.getElementById('bl-content');
    backlog.innerHTML = '';
    allTask.slice().reverse().forEach((task, i) => {
        backlog.innerHTML += renderBacklogTask(task, i);
        setCategoryColor(task, i);
    });
}


function setCategoryColor(task, i) {
    background = document.getElementById(`bl-category${i}`);
    if (task.categorie == 'Product') {
        background.classList.add('Product')
    }
    if (task.categorie == 'Marketing') {
        background.classList.add('Marketing')
    }
    if (task.categorie == 'Sale') {
        background.classList.add('Sale')
    }
}


/* HTML RENDERING */

function renderBacklogTask(task, i) {
    return /*html*/ `
    <div id="bl-category${i}" class="bl-task-box">
        <div class="content-bg card border-0 mb-3 px-2 py-3 rounded-end rounded-0">
            <div class="row g-0">
                <div class="col-md-4 bl-w-50 d-flex align-items-center">
                    <div class="d-flex align-items-center bl-w-75">
                        <!-- <img class="me-4" src="./img/logo.png"> -->
                        <div class="d-flex flex-column w-100">
                            <span>${task.SelectedEmployee}</span>
                            <a class="overflow-hidden text-nowrap text-overflow" href="mailto:${task.SelectedEmployeeEmail}">${task.SelectedEmployeeEmail}</a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center bl-w-25">
                        <span>${task.categorie}</span>
                    </div>
                </div>
                <div class="col-md-8 bl-w-50 rs-mt pl">
                    <span>${task.description}</span>
                </div>
            </div>
        </div>
    </div>`
}