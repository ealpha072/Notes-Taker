//dom elements
let notes = document.querySelector('.notes'),
    instructions = document.querySelector(".instructions"),
    startButton = document.querySelector('.start'),
    pauseButton = document.querySelector('.pause'),
    noteTitle = document.querySelector('.title'),
    saveNotes = document.querySelector('.save'),
    myForm = document.getElementsByTagName('form')[0],
    tbody = document.querySelector('.usernotes'),
    noteContent = '';

let myNotes = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(myNotes))
const data = JSON.parse(localStorage.getItem('items'))
console.log(data)
render(data)


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous = true;

//when recog starts running

/*recognition.onstart = function() {
    instructions.textContent = "Speech Recognition is now running";
}*/

recognition.onstart = function() {
    instructions.text('Speech Recognition is now running');
}


//when user finishes talking;

/*recognition.onspeechend = function() {
instructions.textContent = "Speech Recognition has ended";
}*/

recognition.onspeechend = function() {
    instructions.text("Speech Recognition has ended");
}

/*recognition.onerror = function(e) {
if (e.error == 'no-speech') {
    instructions.textContent = 'No speech was detected. Try again.';
};
}*/

recognition.onerror = function(e) {
    if (e.error == 'no-speech') {
        instructions.text('No speech was detected. Try again.');
    };
}

//when results are returned;

recognition.onresult = function(e) {
    var current = e.resultIndex;
    var transcript = e.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == e.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent += transcript;
        notes.val(noteContent);
    }
}



//start button event listener

/*startButton.addEventListener('click', (e) => {
    if (noteContent.length && noteTitle.length) {
        noteContent += '';
    }
    recognition.start();
})*/

$(".start").on('click', function(e) {
    recognition.start();
})

//pause button event listener

/*pauseButton.addEventListener('click', (e) => {
    recognition.stop();
    instructions.textContent = '';
    instructions.textContent = 'Voice recognition paused'
})*/

$('.pause').on('click', function(e) {
    recognition.stop();
})

//notes event listener
notes.addEventListener('input', (e) => {
        noteContent = this.value
    })
    //splice notes
function spliceNotes(str) {

}


//save notes
saveNotes.addEventListener('click', (e) => {
    e.preventDefault();
    if (notes.value === '') {
        alert('Nothing to save')
    } else {
        let notesToSave = notes.value,
            title = noteTitle.value,
            timeCretaed = new Date().toLocaleString();
        myNotes.push({ title: title, note: notesToSave, time: timeCretaed })
        localStorage.setItem('items', JSON.stringify(myNotes))
        tbody.innerHTML = '';
        render(myNotes)
        myForm.reset()
    }
})


function render(arr) {
    arr.forEach(item => {
            let tr = document.createElement('tr')
                /*let cut =[];
                cut.push(item.note);
                cut.split(' ')
                let display = cut[0]*/

            let content = `
            <td>${item.title}</td>
            <td>${item.note[0].toUpperCase()}</td>
            <td>
                <button class = 'btn btn-primary'>Edit</button>
            </td>
            <td>
                <button class = 'btn btn-danger'>Danger</button>
            </td>
            <td>${item.time}</td>
            
        `
            tr.innerHTML = content
            tbody.appendChild(tr)
        })
        //tbody.append(tr)
}

function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();

    //set text and voice attributes
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech)
}