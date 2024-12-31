var sec=0
var min=0
var hors=0

var interval

function start() {
    watch()
    interval= setInterval(watch, 1000);
}

function pause() {
    clearInterval(interval);
}

function stop() {
    window.alert("Você parou em: "+document.getElementById('watch').innerText)
    sec=0
    min=0
    hors=0
    document.getElementById('watch').innerText='00:00:00'
}

function twoDigts(digito) {
    if (digito < 10) {
        return '0'+digito
    } else {
        return digito
    }
}

function watch() {
    sec++
    if (sec==60) {
        if (min==60) {
            hors++
            min=0
            sec=0
        } else {
        min++
        sec=0  
        }
    }
    document.getElementById('watch').innerText=twoDigts(hors)+':'+twoDigts(min)+':'+twoDigts(sec)
}
