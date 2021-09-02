const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${
    window.location.host}`);



function makeMessage(type,payload){
    const msg = {type,payload};
    return JSON.stringify(msg);
}



socket.addEventListener("open", ()=> {
    console.log("Connected to Server ✅");
})

socket.addEventListener("message",(message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close",()=> {
    console.log("Disconnected to Server X");
});


function hadleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message",input.value));
    const li = document.createElement("li");
    li.innerText = `You:${input.value}`;
    messageList.append(li);
    input.value= "";
}

function hadleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname",input.value));
    input.value= "";
}


messageForm.addEventListener("submit",hadleSubmit );
nickForm.addEventListener("submit",hadleNickSubmit);