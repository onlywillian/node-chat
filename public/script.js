const socket = io();

const messages = document.querySelector('.messages-output');
const form = document.getElementById('message-area');
const input = document.getElementById('message'); 

var username = '';/* The username */

/* Inserting the user data camp */
window.onload = () => {
    const nameContainer = document.querySelector('.name-container');
    const nameInput = document.getElementById('username');
    const button = nameContainer.querySelector('button');

    button.addEventListener('click', () => {
        if (nameInput.value) {
            username = nameInput.value;
            nameContainer.remove();
        };
    });
};

/* Messages only to the sender */
function createSenderMessage(value) {
    const div = document.createElement('div');

    messages.appendChild(div);
    div.innerHTML = value;
    div.className = 'my-message';
};

/* Messages for all users except the sender */
function createReceivedMessage(msg) {
    const div = document.createElement('div');

    messages.appendChild(div);
    div.className = 'other-message';
    div.textContent = msg;
};

function updateUsersCount(total) {
    try {
        document.querySelector('.clients-count').querySelector('span').remove();
    } catch (error) {}

    const p = document.createElement('span');
    const container = document.querySelector('.clients-count');

    container.appendChild(p);
    if (window.innerWidth <= 500) return p.innerHTML = total;
    p.innerHTML = `${total} User(s) Online`;
}; 

/* if any user type */
input.addEventListener('keyup', () => {
    if (input.value) {
        socket.emit('typing', username)
    }
    else socket.emit('not typing')
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (input.value) {
    createSenderMessage(input.value);

    socket.emit('chatMessage', input.value, username);

    input.value = '';
    };
});

socket.on("typing", user => {
    document.querySelector('.typing').innerHTML = `${user} is typing...`
});

socket.on("messageForAllUsers", msg => {
    createReceivedMessage(msg);
});

socket.on("newUser", number => {
    updateUsersCount(number);
});