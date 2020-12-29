//dom elements
let notes =document.querySelector('.notes'),
    instructions =document.querySelector(".instructions"),
    startButton = document.querySelector('.start'),
    pauseButton = document.querySelector('.pause'),
    noteTitle = document.querySelector('.title'),
    saveNotes = document.querySelector('.save'),
    myForm = document.getElementsByTagName('form')[0],
    tbody  =document.querySelector('.usernotes'),
    noteContent = '';

let myNotes = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [];
  
localStorage.setItem('items', JSON.stringify(myNotes))
const data = JSON.parse(localStorage.getItem('items'))
  console.log(data)
  render(data)


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous =true;

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

//start button event listener
startButton.addEventListener('click',(e)=>{
    if(noteContent.length && noteTitle.length){
        noteContent+='';
    }
    recognition.start();
})

//pause button event listener
pauseButton.addEventListener('click',(e)=>{
    recognition.stop();
    instructions.textContent='';
    instructions.textContent = 'Voice recognition paused'
})

//notes event listener
notes.addEventListener('input',(e)=>{
    noteContent =this.value
})

//save notes
saveNotes.addEventListener('click',(e)=>{
    e.preventDefault();
    let notesToSave = notes.value,
        title = noteTitle.value
    myNotes.push({title:title,note:notesToSave})
    localStorage.setItem('items', JSON.stringify(myNotes))
    render(myNotes)
    console.log(myNotes)
    myForm.reset()
})


function render(arr){
    arr.forEach(item=>{
        let tr =  document.createElement('tr')
        let content =`
            <td>${item.title}</td>
            <td>Otto</td>
            <td>
                <button class = 'btn btn-primary'>Edit</button>
            </td>
            <td>
                <button class = 'btn btn-danger'>Danger</button>
            </td>
            
        `
        tr.innerHTML = content
        tbody.appendChild(tr)
    })
    //tbody.append(tr)
}