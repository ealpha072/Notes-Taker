var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous =true;

const notes =$('.notes');
const instructions =$(".instructions");
var noteContent = '';


//when recog starts running

recognition.onstart=function(){
    instructions.text("Speech Recognition is now running")
}

//when user finishes talking;
recognition.onspeechend=function(){
    instructions.text("Speech Recognition has ended")
}
recognition.onerror=function(e){
    if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}
//when results are returned;
recognition.onresult=function(e){
    var current = event.resultIndex;
    var transcript = e.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    notes.val(noteContent);
  }
}

$(".start").on('click',function(e){
    if(noteContent.length){
        noteContent +='';
    }
    recognition.start()
})

$(".pause").on('click',function(e){
    recognition.stop();
    instructions.text = ("Voice recognition paused");
})

notes.on('input',function(){
    noteContent =$(this).val();
})
