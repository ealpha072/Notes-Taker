try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.app').hide()
}

//dom elements
var notes = $(".notes");
var title = $(".title");
var instructions = $(".instructions");
var noteContent = "";
var tbody = $('.usernotes');

let myNotes = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(myNotes));
const data = JSON.parse(localStorage.getItem('items'));
//console.log(data);
render(data);

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice recognition activated;try speaking into the microphone");
}

recognition.onspeechend = function() {
    instructions.text("Speech recognition paused");
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

    if (noteContent.length) {
        noteContent += ' ';
    }
    recognition.start();
})

$(".pause").on('click', function(e) {
    recognition.stop();
    instructions.text("Voice regnition paused");
})

notes.on('input', function() {
    noteContent = $(this).val();
})


$(".save").on('click', function(e) {
    recognition.stop();
    if (!notes.val() || !title.val()) {
        instructions.text("Cant save empty notes");
    } else {
        //save to local strorage
        let notesToSave = notes.val(),
            noteTitle = title.val();
        timeCreated = new Date().toLocaleString();
        myNotes.push({ note: notesToSave, title: noteTitle, time: timeCreated });
        localStorage.setItem('items', JSON.stringify(myNotes));
        //reset variables and ui
        noteContent = " ";
        notes.val(" ");
        title.val(" ");
        instructions.text("Notes saved");
        tbody.html(" ");
        render(myNotes);
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


///render function
function render(arr) {
    arr.forEach(item => {
            let tr = document.createElement('tr')

            let content = `
            <td>${item.title}</td>
            <td>
                <button class = 'btn btn-primary'>Edit</button>
            </td>
            <td>
                <button class = 'btn btn-danger'>Delete</button>
            </td>
            <td>${item.time}</td>`
            tr.innerHTML = content
            tbody.append(tr)
        })
        //tbody.append(tr)
}

//tbody.append(tr)