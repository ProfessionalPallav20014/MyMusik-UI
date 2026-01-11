// initialize the variables
let index = 0;
let masterPlay = document.getElementById('masterplay');
let audioElement = new Audio('songs/1.mp3');
let myProgressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songname= document.getElementById('song-name');
let songs = [
    { songName: "NCS-1", filePath: "songs/1.mp3 - TrackTribe", coverPath: "cover/1.jpg" },
    { songName: "NCS-2", filePath: "songs/2.mp3 - TrackTribe", coverPath: "cover/2.jpg" },
    { songName: "NCS-3", filePath: "songs/3.mp3 - TrackTribe", coverPath: "cover/3.jpg" },
    { songName: "NCS-4", filePath: "songs/4.mp3 - TrackTribe", coverPath: "cover/4.jpg" },
    { songName: "NCS-5", filePath: "songs/5.mp3 - TrackTribe", coverPath: "cover/5.jpg" },
    { songName: "NCS-6", filePath: "songs/6.mp3 - TrackTribe", coverPath: "cover/6.jpg" }
];

songitems.forEach((item, i) => {
    item.getElementsByTagName('img')[0].src = songs[i].coverPath;
    item.getElementsByClassName('song-name')[0].innerHTML = songs[i].songName;
})

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        songname.innerHTML=songs[0].songName;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressbar.value = progress;
})

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressbar.value * audioElement.duration) / 100;
})

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((item) => {
        item.classList.add('fa-play-circle');
        item.classList.remove('fa-pause-circle');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((item) => {
    item.addEventListener('click', (e) => {
        makeAllplays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${index}.mp3`;
        songname.innerText=songs[index-1].songName;
        gif.style.opacity=1;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('backward').addEventListener('click', () => {
    if (index <= 1) {
        index = 1;
    }
    else {
        index -= 1;
    }
    audioElement.src = `songs/${index}.mp3`;
    songname.innerHTML=songs[index-1].songName;
    gif.style.opacity=1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('forward').addEventListener('click', () => {
    if (index >=6 ) {
        index = 1;
    }
    else {
        index += 1;
    }
    audioElement.src = `songs/${index}.mp3`;
    songname.innerHTML=songs[index-1].songName;
    gif.style.opacity=1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})