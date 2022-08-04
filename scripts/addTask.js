let users = ['avatar1.png', 'avatar2.png', 'avatar3.png']


function renderAvatarPicker() {
    document.getElementById('avatarPicker').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.getElementById('avatarPicker').innerHTML += `<img id="user-${i}" src="img/avatars/${user}" class="avatar" onclick="selectUser(${i})">`

    }
    document.getElementById('avatarPicker').innerHTML += ` <img class="avatar" src="img/icon plus.png" alt="">`;
}

function selectUser(i) {

    let user = document.getElementById('user-' + i)
    user.classList.toggle('avatar-selected');
}