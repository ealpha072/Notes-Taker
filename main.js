try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.app').hide()
}

//dom elements
var notes = $(".notes");
var instructions = $(".instructions");
var noteContent = "";

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice recognition activated;try speaking into the microphone");
}

recognition.onspeechend = function() {
    instructions.text("Long pause detected; voice recognition stoped");
}

recognition.onerror = function(e) {
    if (e.error == 'no-speech') {
        instructions.text("No speech was detected,please try again");
    }
}

recognition.onresult = function(e) {
    var current = e.resultIndex;

    //transcript of what is said
    var transcript = e.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == e.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent += transcript;
        notes.val(noteContent);
    }
}