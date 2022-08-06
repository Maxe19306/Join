setURL('https://gruppe-289.developerakademie.net/Join/smallest_backend_ever');

let users = [];
isLogedIn = false;


/**
 * Load all Users for the login.
 * 
 */
async function loadDataBase() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('user')) || [];
}


/**
 * Load all Users from the Server for the admin-panel.
 * 
 */
async function loadDataBaseForPanel() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('user')) || [];
    showAllUsers();
}


/**
 * Crypt the Password and Username
 * @param {string} salt 
 * @param {string} text 
 * @returns 
 * 
 */
const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
};


/**
 * decrypt the Password and Username for the Login.
 * @param {string} salt 
 * @param {string} encoded 
 * @returns
 * 
 */
const decrypt = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
};


/**
 * Show all users in the admin-panel.
 * 
 */
function showAllUsers() {
    let allUsers = document.getElementById('allUsers');
    allUsers.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        const decryptUserName = decrypt('salt', users[i]['name']);
        const isAdmin = users[i]['isAdmin'];

        allUsers.innerHTML += generateShowAllUsersHTML(decryptUserName, i);

        if (isAdmin == true) {
            document.getElementById(`admin${i}`).innerHTML = "Yes";
        } else {
            document.getElementById(`admin${i}`).innerHTML = "No";
        }
    }
}


/**
 * Generate all users in the HTML-content.
 * @param {string} decryptUserName 
 * @param {number} i 
 * @returns 
 * 
 */
function generateShowAllUsersHTML(decryptUserName, i) {
    return /*html*/ `
    <div class="flex-left underline mt-3">
        <div class=" width-200px">
            <span><b>Username:</b><br></span> 
            <span>${decryptUserName}</span>
        </div>
        <div class="mb-3 width-200px">
            <span class=""><b>Admin:</b><br></span> 
            <span id="admin${i}"></span>
        </div>      
        <div class="delete-btn-container">
            <button onclick="deleteUsers(${i})" class="delete-btn-design me-2">Delete</button>
        </div>     
    </div>`
}


/**
 * create a new user
 * 
 */
async function createUser() {
    let userName = document.getElementById('newUserName');
    let userPassword = document.getElementById('newUserPassword');
    let isAdmin = document.getElementById('isAdmin');
    const cryptUserName = crypt('salt', userName.value);
    const cryptPassword = crypt('salt', userPassword.value);

    if (isAdmin.checked == false) {
        noAdmin(cryptUserName, cryptPassword);
    } else {
        admin(cryptUserName, cryptPassword);
    }

    userName.value = "";
    userPassword.value = "";
    showAllUsers();
}


/**
 * Add user in wihtout admin.
 * @param {string} cryptUserName 
 * @param {string} cryptPassword 
 * 
 */
async function noAdmin(cryptUserName, cryptPassword) {
    let user = {
        'name': cryptUserName,
        'password': cryptPassword,
        'isAdmin': false
    }
    users.push(user);
    await backend.setItem('user', JSON.stringify(users));
}



/**
 * Add user in admin.
 * @param {string} cryptUserName 
 * @param {string} cryptPassword 
 * 
 */
async function admin(cryptUserName, cryptPassword) {
    let user = {
        'name': cryptUserName,
        'password': cryptPassword,
        'isAdmin': true
    }

    users.push(user);
    await backend.setItem('user', JSON.stringify(users));
}


/**
 * Delete User
 * @param {number} i 
 */
async function deleteUsers(i) {
    users.splice(i, 1);
    await backend.setItem('user', JSON.stringify(users));
    showAllUsers();
}


/**
 * login-Function
 * 
 */
function login() {
    let userName = document.getElementById('userName');
    let userPassword = document.getElementById('userPassword');

    for (let i = 0; i < users.length; i++) {
        const decryptUserName = decrypt('salt', users[i]['name']);
        const decryptPassword = decrypt('salt', users[i]['password']);

        if (userName.value == decryptUserName && userPassword.value == decryptPassword) {
            window.location.href = "../addTask.html";

        } else {
            setTimeout(() => {
                document.getElementById('noUser').classList.remove("d-none");
                document.getElementById('extras').classList.remove('mt-5');
                document.getElementById('extras').classList.add('mt-2');
            }, 250);

        }

        userName.value = "";
        userPassword.value = "";

    }
}