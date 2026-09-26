// ====== MUSIC ======
const songs = [
  {
    title: "dark beach × iris (slowed)",
    file: "assets/music.mp3",
    cover: "assets/cover.jpg"
  }
  // Add more songs here later.
];

let index = 0;

const audio = document.getElementById("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const title = document.getElementById("song-title");
const cover = document.getElementById("cover");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function loadSong() {
  const song = songs[index];
  title.textContent = song.title;
  cover.src = song.cover;
  audio.src = song.file;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    play.textContent = "Ⅱ";
  } else {
    audio.pause();
    play.textContent = "▶";
  }
}

play.addEventListener("click", togglePlay);

prev.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong();
  audio.play();
  play.textContent = "Ⅱ";
});

next.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong();
  audio.play();
  play.textContent = "Ⅱ";
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  current.textContent = formatTime(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", () => {
  next.click();
});

loadSong();


// ====== FLOATING PARTICLES ======
const particleBox = document.getElementById("particles");

for (let i = 0; i < 35; i++) {
  const p = document.createElement("div");
  p.className = "particle";

  const size = Math.random() * 5 + 2;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}%`;
  p.style.animationDuration = `${Math.random() * 12 + 8}s`;
  p.style.animationDelay = `${Math.random() * -15}s`;

  particleBox.appendChild(p);
}


// ====== MOUSE PARALLAX ======
const bg = document.querySelector(".background");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - .5) * 10;
  const y = (e.clientY / window.innerHeight - .5) * 10;
  bg.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
});
