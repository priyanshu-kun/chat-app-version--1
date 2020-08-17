const socket = io('http://localhost:3000');
const messageForm = document.querySelector(".form");
const inputMessage = document.querySelector("#message");
const messageContainer = document.querySelector(".message-container");

const user = prompt("What is your name?");
appendMessageToDom(`You`,` join the chat`);
socket.emit("new-user",user);

socket.on("init-msg",data => {
    console.log(data.userName);
    appendMessageToDom(data.userName,data.message);

    messageContainer.scrollTop = messageContainer.scrollHeight;
})

socket.on("user-connected",name => {
    appendMessageToDom(`${name}`,` has join the chat!`);
})

socket.on("user-disconnect",name => {
    appendMessageToDom(`${name}`,' has leave the chat');
})


messageForm.addEventListener("submit",(event) => {
    event.preventDefault();
    const message = inputMessage.value;
    appendMessageToDom("You",message);
    socket.emit("send-chatMessage",message);
    inputMessage.value = "";
    inputMessage.focus();
})

function appendMessageToDom(name,message){
    const div = document.createElement("div");
    div.classList.add("chat");
    // console.log(data)
    div.innerHTML = `<strong>${name}</strong>${message}`;
    messageContainer.insertAdjacentElement("beforeend",div)

}