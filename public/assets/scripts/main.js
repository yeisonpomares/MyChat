
function hideLogin() {
    var container = document.getElementById("login-container");
    container.style.display = 'none';
    container.style.visibility = 'hidden';
}

function hideRegister() {
    var container = document.getElementById("register-container");
    container.style.display = 'none';
    container.style.visibility = 'hidden';
}

function showRegister() {
    var container = document.getElementById("register-container");
    container.style.display = 'block';
    container.style.visibility = 'visible';

    hideLogin();
}
function showLogin() {
    var container = document.getElementById("login-container");
    container.style.display = 'block';
    container.style.visibility = 'visible';

    hideRegister();
}
function showChat() {
    var container = document.getElementById("chat-container");
    container.style.display = 'block';
    container.style.visibility = 'visible';

    hideLogin();
}


var buttonLogin = document.getElementById("button-login");
buttonLogin.addEventListener('click', () => {
    var message = document.getElementById("login-message");
    var username = document.getElementById("login-username");
    var password = document.getElementById("login-password");

    message.innerHTML = "";

    socket.emit('chat:login', { username: username.value, password: password.value });
});


var buttonRegister = document.getElementById("register-button");
buttonRegister.addEventListener('click', () => {
    var username = document.getElementById("register-username");
    var password1 = document.getElementById("register-password2");
    var password2 = document.getElementById("register-password1");

    socket.emit("chat:register", { username: username.value, password1: password1.value, password2: password2.value });
});

var menuChatGeneral = document.getElementById("menu-chat-general");

menuChatGeneral.addEventListener('click',()=>{
    var chatGeneral = document.getElementById("chat-general");
    chatGeneral.style.display = 'block';
    chatGeneral.style.visibility = 'visible';

    hideChats();
});

function hideChatGeneral(){
    var chatGeneral = document.getElementById("chat-general");
    chatGeneral.style.display = 'none';
    chatGeneral.style.visibility = 'hidden';
}


function hideChats(){
    var counter = document.getElementById("counter");

    for(i=1;i<=parseInt(counter.value);i++){
        var chat = document.getElementById("chat-"+i);
        chat.style.display = 'none';
        chat.style.visibility = 'hidden';
    }
}