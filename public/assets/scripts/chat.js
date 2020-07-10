//Websocket: Connect
const socket = io('http://localhost:3000');


var counter = document.getElementById("counter");

//Chat: 
var message = document.getElementById('message');
var username = document.getElementById('chat-username');
var btn = document.getElementById('send');


var chatWindow = document.getElementById('chats');
var outputGeneral = document.getElementById('output-general');


var chatGeneral = document.getElementById('chat-general');
var actions = document.getElementById('actions-general');
var users = document.getElementById('users');



function sendMessage() {
    socket.emit('chat:message', { username: username.value, message: message.value });
    message.value = "";
    message.focus();
}

message.addEventListener('keypress', (e) => {

    if (e.keyCode == 13) {
        sendMessage();
    }

})
btn.addEventListener('click', () => {
    sendMessage();
});

socket.on('chat:login', (data) => {
    var dataParam = data.split(";");
    var message = document.getElementById("login-message");

    if (dataParam[0] == '0') {
        message.style.color = "red";
        message.innerHTML = dataParam[1];
    } else if (dataParam[0] == '1') {
        //Login successfull        
        showChat();
        var chatUserName = document.getElementById("chat-username");
        chatUserName.value = dataParam[2];
        socket.emit('chat:newuser', dataParam[2]);
    }
});

socket.on('chat:register', (data) => {
    var dataParam = data.split(";");

    var message = document.getElementById("register-message");
    if (dataParam[0] == '0') {
        message.style.color = "red";
    } else {
        message.style.color = "green";
    }

    message.innerHTML = dataParam[1];
});

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    outputGeneral.innerHTML += `
        <p>
            <strong>${data.username}</strong>: ${data.message}
        </p>
    `;

});

socket.on('chat:typing', (username) => {
    actions.innerHTML = `
    <p><em>${username} is typing a message</em></p>
    `;
});

socket.on('chat:newuser', (username) => {
    counter.value = parseInt(counter.value) + 1;
    //Add User to Userlist
    users.innerHTML += `
        <a href="#" class="list-group-item list-group-item-action">
            <ul>
                <li>
                    <div id="div_${username}">${username}</div>
                </li>
            </ul>
        </a>`;

    chatWindow.innerHTML += `
        <div id="chat-${counter.value}" style="display:none;visibility:hidden">
            <div id="chat-window-${username}">
                <div id="output-${username}" style="height: 550px;overflow-x: scroll">
                    <!-- Mensajes -->
                </div>
                <div id="actions-${username}">
                    <!-- Mensajes -->
                </div>
            </div>
            <input type="hidden" id="chat-${username}" id="chat-${username}">
            <input type="text" id="message-${username}" placeholder="Message">
            <button id="send-${username}">Send Message</button>
        </div>
        `;

    //Usernames action
    var div_user = document.getElementById("div_" + username);
    div_user.addEventListener('click', () => {
        hideChatGeneral();
        hideChats();

        var userChat = document.getElementById("chat-" + counter.value);
        userChat.style.visibility = "visible";
        userChat.style.display = "block";
    });

    //Receive Message
    socket.on('chat:'+username, (data) => {
        var output = document.getElementById("output-"+data.username);
        var action = document.getElementById("actions-"+data.username);
        actions.innerHTML = '';
        output.innerHTML += `
            <p>
                <strong>${data.username}</strong>: ${data.message}
            </p>
        `;
    
    });

    //Emit message
    var buttonSend = document.getElementById("send-"+username);
    buttonSend.addEventListener('click',()=>{
        socket.emit('chat:message', { username: username.value, message: message.value });
        message.value = "";
        message.focus();
    });

});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});