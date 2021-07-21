const socket = io();

const messages = document.querySelector('.messages-output');
const form = document.getElementById('message-area');
const input = document.getElementById('message'); 

function createSenderMessage(value) {
    const div = document.createElement('div');

    messages.appendChild(div);
    div.innerHTML = value;
    div.className = 'my-message';
}

function createReceivedMessage(msg) {
    const div = document.createElement('div');

    messages.appendChild(div);
    div.className = 'other-message';
    div.textContent = msg;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (input.value) {
    createSenderMessage(input.value);

    socket.emit('chat message', input.value);

    input.value = '';
    };
});

socket.on("message for all users", msg => {
    createReceivedMessage(msg);
});