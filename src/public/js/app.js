const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted= false;
let cameraOff = false;

async function getMedia(){
  try{
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
   myFace.srcObject = myStream;
  }catch(err){
    console.log(err)
  }
}

getMedia();


function handleMuteClick(){
 if(!muted){
   muteBtn.innerText = "UnMute";
   muted= true;
 }else{
  muteBtn.innerText = "Mute";
  muted = false;
 }

}

function handleCameraClick(){
  if(cameraOff){
    cameraBtn.innerText = "Camera Off";
    cameraOff= false;
  }else{
    cameraBtn.innerText = "Camera On";
    cameraOff= true;
  }
}


muteBtn.addEventListener("click",handleMuteClick)

cameraBtn.addEventListener("click",handleCameraClick)