var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList||webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent||webkitSpeechRecognitionEvent
var recognition = new SpeechRecognition();

//when recog starts running

recognition.onstart=function(){

}

//when user finishes talking;
recognition.onspeechend=function(){

    recognition.stop();
}

//when results are returned;
