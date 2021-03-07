try {
    var speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch {
    console.error(e);
    $(".no-support").show();
    $('.app').hide()
}