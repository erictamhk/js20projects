const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
}

// Pause
function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let SongIndex = 0;

// Previous Song
function prevSong() {
  SongIndex--;
  if (SongIndex < 0) {
    SongIndex = songs.length - 1;
  }
  console.log(SongIndex);
  loadSong(songs[SongIndex]);
  playSong();
}

// Next Song
function nextSong() {
  SongIndex++;
  if (SongIndex > songs.length - 1) {
    SongIndex = 0;
  }
  console.log(SongIndex);
  loadSong(songs[SongIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[SongIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    // Delay switching duration Element to avoid NaN
    if (!isNaN(durationMinutes)) {
      durationEl.textContent = `${durationMinutes}:${durationSecond}`;
    }

    // Calculate display for current time
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSecond = Math.floor(currentTime % 60);
    if (currentTimeSecond < 10) {
      currentTimeSecond = `0${currentTimeSecond}`;
    }
    console.log(currentTimeMinutes, currentTimeSecond);
    // Delay switching currentTime Element to avoid NaN
    if (!isNaN(currentTimeMinutes)) {
      currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSecond}`;
    }
  }
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
