var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous =true;
recognition.interimResults = true;
recognition.lang="en-US";
const notes =document.getElementsByClassName('notes');


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
    recognition.start()
})
$(".pause").on('click',function(e){
    recognition.stop();
})
