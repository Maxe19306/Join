setURL('https://gruppe-289.developerakademie.net/Join/smallest_backend_ever');

let users = [];


/**
 * Load all Users from the Server.
 * 
 */
async function loadDataBase() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('user')) || [];
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


/* async function createUser() {
    let userName = document.getElementById('userName');
    let userPassword = document.getElementById('userPassword');
    const cryptUserName = crypt('salt', userName.value);
    const cryptPassword = crypt('salt', userPassword.value);

    let user = {
        'name': cryptUserName,
        'password': cryptPassword,
        'isAdmin': true
    }

    users.push(user);
    await backend.setItem('user', JSON.stringify(users));

    userName.value = "";
    userPassword.value = "";
} */


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

        if (userName.value == decryptUserName && userPassword.value == decryptPassword ) {
            window.location.href = "../addTask.html";
        } else {
            document.getElementById('noUser').classList.remove("d-none");
            document.getElementById('extras').classList.remove('mt-5');
            document.getElementById('extras').classList.add('mt-2');
        }

        userName.value = "";
        userPassword.value = "";
    }
}