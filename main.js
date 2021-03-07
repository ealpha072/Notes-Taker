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

//app buttons and input

$(".start").on('click', function(e) {
    ///omitt
    recognition.start();
})

$(".pause").on('click', function(e) {
    recognition.stop();
    instructions.text("Voice regnition paused");
})

notes.on('input', function() {
    noteContent = $this.val();
})

$(".save").on('click', function(e) {
    recognition.stop();
    if (!noteContent.length) {
        instructions.text("Cant save empty notes");
    } else {
        //save to local strorage

        //reset variables and ui
        noteContent = "";
        notes.val("");
        instructions.text("Notes saved");
    }
})

//speech synthesis

function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}