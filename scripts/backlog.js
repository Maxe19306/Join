async function loadBacklog() {
    await downloadFromServer();
    loadTaskToBacklog();
}


function loadTaskToBacklog() {
    let backlog = document.getElementById('bl-content');
    backlog.innerHTML = '';
    allTask.slice().reverse().forEach(task =>
        backlog.innerHTML += /*html*/ `
            <div class="content-bg card border-0 mb-3 px-2 py-3 rounded-4 border-start border-4">
                <div class="row g-0">
                    <div class="col-md-4 bl-w-50 d-flex align-items-center">
                        <div class="d-flex align-items-center w-50">
                            <img class="me-4" src="./img/placeholder.png">
                            <div class="d-flex flex-column">
                                <span>Name blablalblabla</span>
                                <span>E-mail</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center w-50">
                            <span>${task.categorie}</span>
                        </div>
                    </div>
                    <div class="col-md-8 bl-w-50 rs-mt">
                        <span>${task.description}</span>
                    </div>
                </div>
            </div>`)
}