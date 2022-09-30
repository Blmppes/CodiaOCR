const subbut = document.getElementById("submitbtn");
const imgsrc = document.getElementById("uploadimgsrc");
subbut.onclick = function(event) {
    const file = imgsrc.files[0];
    const img = document.getElementById("displayimg");
    let reader = new FileReader();
    reader.onloadend = function() {
        img.src = reader.result;
    }
    reader.readAsDataURL(file);

    var fd = new FormData();    
    fd.append( 'file', file);

    $.ajax({
        url: 'http://localhost:8000/',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            let ans = data;
            console.log(ans);
            let resbox = document.getElementById("resultbox");
            resbox.innerHTML = ans;
            var msg = new SpeechSynthesisUtterance(ans);
            window.speechSynthesis.speak(msg);
        }
    });
    event.preventDefault();
 }