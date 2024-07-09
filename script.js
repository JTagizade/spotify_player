const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const song = document.getElementById('song');

const avatar = document.getElementById('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');


const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');

const volumeBar = document.getElementById('volume-bar');
const volumeEl = document.getElementById('volume');


const curTime = document.getElementById('current-time');
const songDuration = document.getElementById('duration');


const playList = [
    {
        name: "baby-be-mine",
        artist: 'Michael Jackson',
        title: "Baby be mine",
        duration: "4:22"
    },
    {
        name: "smooth-operator",
        artist: 'Sade',
        title: "Smooth Operator",
        duration: "4:14"
    },
    {
        name: "sev",
        artist: 'Rauf',
        title: "Sev",
        duration: "4:00"
    },
];

let isPlaying = false;
let songIndex = 0;

songDuration.textContent = `${playList[songIndex].duration}`; 



const playSong = () => {
    song.play();
    isPlaying = true;
    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
};

const pauseSong = () => {
    song.pause();
    isPlaying = false;
    playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
};

playBtn.addEventListener('click', () => {
   isPlaying ? pauseSong() : playSong();
});


song.addEventListener('timeupdate', function(){
    const {duration, currentTime} = this;

    if(!duration) return;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    curTime.textContent = `${currentMinutes}:${String(currentSeconds).padStart(2, 0)}`;
    songDuration.textContent = `${minutes}:${String(seconds).padStart(2, 0)}`;

    progress.style.width = `${(currentTime / duration) * 100}%`
});

nextBtn.addEventListener("click", () => {
    
    songIndex < playList.length - 1 ? songIndex++ : (songIndex = 0);
    displaySong();
    if(!isPlaying) return;    
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex > 0 ? songIndex-- : (songIndex = playList.length -1);
    displaySong();
    if(!isPlaying) return; 
    playSong();
});

const displaySong = () => {
    songDuration.textContent = `${playList[songIndex].duration}`; 
    song.src = `/audio/${playList[songIndex].name}.mp3`;
    avatar.src = `/img/${songIndex}.jpeg`;
    artist.textContent = `${playList[songIndex].artist}`;
    title.textContent = `${playList[songIndex].title}`;
};

progressBar.addEventListener("click", function(event) {
    let { offsetX: clicked } = event;
    let { width } = progressBar.getBoundingClientRect()
    song.currentTime = (clicked / width) * song.duration;
});

volumeBar.addEventListener("click", function(event) {
    let { offsetX: clicked } = event;
    let { width } = volumeBar.getBoundingClientRect()
    song.volume = (clicked / width);
    volumeEl.style.width = width * song.volume + "px";
});




