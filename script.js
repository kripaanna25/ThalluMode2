const tilt = document.getElementById('tilt');
const face = document.getElementById('face');
const btn = document.getElementById('slapBtn');
const caption = document.getElementById('caption');
const sfx = document.getElementById('slapSound');

const lines = [
  "Ayyoo!! 😖",
  "Aww!!!! 💥",
  "That Hurts!!💥",
  "STOPP 😤",
  "Deyyyy",
  
];

// Subtle fake-3D with mouse
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;  // -1..1
  const dy = (e.clientY - cy) / cy;  // -1..1
  const maxTilt = 14;                // degrees
  const ry = (-dx * maxTilt).toFixed(2);
  const rx = ( dy * maxTilt * 0.7).toFixed(2);
  tilt.style.setProperty('--ry', `${ry}deg`);
  tilt.style.setProperty('--rx', `${rx}deg`);
});

// Slap action
function slap() {
  try { sfx.currentTime = 0; sfx.play(); } catch(_) {}

  // Random Malayalam caption
  caption.textContent = lines[Math.floor(Math.random() * lines.length)];

  // Restart animations cleanly
  face.classList.remove('face-impact', 'face-wobble');
  // Force reflow to reset animation
  void face.offsetWidth;
  face.classList.add('face-impact');
  // Wobble after the hit settles a bit
  setTimeout(() => face.classList.add('face-wobble'), 90);
}

btn.addEventListener('click', slap);
// Also allow clicking the face itself
face.addEventListener('click', slap);

// Optional: mobile tap responsiveness
document.addEventListener('touchstart', (e) => {
  // iOS playback needs user gesture; this primes the audio
  sfx.play().then(() => sfx.pause());
}, { passive: true });
