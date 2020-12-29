var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous =true;

let myNotes = [] ,
    notes =document.querySelector('.notes'),
    instructions =document.querySelector(".instructions"),
    startButton = document.querySelector('.start'),
    pauseButton = document.querySelector('.pause'),
    noteTitle = document.querySelector('.title'),
    saveNotes = document.querySelector('.save'),
    myForm = document.getElementsByTagName('form')[0]
    noteContent = '';


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
    if(noteContent.length && noteTitle.length){
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
    let notesToSave = notes.value,
        title = noteTitle.value
    myNotes.push({title:title,note:notesToSave})
    
    console.log(myNotes)
    myForm.reset()
})
/*
$(".pause").on('click',function(e){
    recognition.stop();
    instructions.text = ("Voice recognition paused");
})

notes.on('input',function(){
    noteContent =$(this).val();
})*/
