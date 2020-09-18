var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous =true;

const notes =$('.notes');
const instructions =$(".instructions");
var noteContent = '';


//when recog starts running

recognition.onstart=function(){
    console.log("Speech Recognition is now running")
}

//when user finishes talking;
recognition.onspeechend=function(){
    console.log("Speech Recognition has ended")
}
recognition.onerror=function(e){
    console.error(e)
}
//when results are returned;
recognition.onresult=function(e){
    var transcript = e.results[0][0].transcript;
    notes.textContent +=transcript;
    notes.value =notes.textContent
}

$(".start").on('click',function(e){
    if(noteContent.length){
        noteContent +='';
    }
    recognition.start()
})

$(".pause").on('click',function(e){
    recognition.stop();
    instructions.text = "Voice recognition paused";
})

notes.on('input',()=>{
    noteContent =$(this).val();
})
