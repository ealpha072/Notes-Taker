var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous =true;

let myNotes = [] 

const notes =document.querySelector('.notes');
const instructions =document.querySelector(".instructions");
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const saveNotes = document.querySelector('.save')
var noteContent = '';


//when recog starts running

recognition.onstart=function(){
    instructions.textContent="Speech Recognition is now running";
}

//when user finishes talking;
recognition.onspeechend=function(){
    instructions.textContent="Speech Recognition has ended";
}
recognition.onerror=function(e){
    if(e.error == 'no-speech') {
    instructions.textContent='No speech was detected. Try again.';
  };
}
//when results are returned;
recognition.onresult=function(e){
    var current = e.resultIndex;
    var transcript = e.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == e.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    notes.val(noteContent);
  }
}


startButton.addEventListener('click',(e)=>{
    if(noteContent.length){
        noteContent+='';
    }
    recognition.start();
})


pauseButton.addEventListener('click',(e)=>{
    recognition.stop();
    instructions.textContent='';
    instructions.textContent = 'Voice recognition paused'
})

notes.addEventListener('input',(e)=>{
    noteContent =this.value
})


saveNotes.addEventListener('click',(e)=>{
    e.preventDefault();
    let notesToSave = notes.value;
    myNotes.push(notesToSave)
    console.log(myNotes)
})
/*
$(".pause").on('click',function(e){
    recognition.stop();
    instructions.text = ("Voice recognition paused");
})

notes.on('input',function(){
    noteContent =$(this).val();
})*/
