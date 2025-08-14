const IMAGE_URL = "https://www.svgrepo.com/show/485692/cross.svg"; // Change to your direct image link
const DROP_COUNT = 20; // Number of raining images
const MIN_SIZE = 30;   // Minimum size in px
const MAX_SIZE = 80;   // Maximum size in px
let SPEED = 2;         // Speed multiplier (higher = faster)

const rainContainer = document.querySelector('.image-rain');
const drops = [];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

for (let i = 0; i < DROP_COUNT; i++) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = IMAGE_URL;
  li.appendChild(img);
  rainContainer.appendChild(li);

  drops.push({
    el: li,
    x: randomBetween(0, window.innerWidth),
    y: randomBetween(-window.innerHeight, 0),
    size: randomBetween(MIN_SIZE, MAX_SIZE),
    speed: randomBetween(1, SPEED),
    angle: randomBetween(-10, 10)
  });
}

function animateRain() {
  drops.forEach(drop => {
    drop.y += drop.speed;
    drop.x += Math.sin(drop.angle * Math.PI / 180) * 0.5;
    if (drop.y > window.innerHeight) {
      drop.y = randomBetween(-100, 0);
      drop.x = randomBetween(0, window.innerWidth);
      drop.size = randomBetween(MIN_SIZE, MAX_SIZE);
      drop.speed = randomBetween(1, SPEED);
    }
    drop.el.style.left = drop.x + "px";
    drop.el.style.top = drop.y + "px";
    drop.el.style.width = drop.size + "px";
    drop.el.style.height = drop.size + "px";
  });
  requestAnimationFrame(animateRain);
}
animateRain();

// Mouse follow & react
window.addEventListener('mousemove', e => {
  drops.forEach(drop => {
    // Mouse follow: drops move slightly toward mouse X
    drop.x += (e.clientX - drop.x) * 0.001;
    // Mouse react: drops get a blur if mouse is near
    const dist = Math.abs(drop.x - e.clientX) + Math.abs(drop.y - e.clientY);
    drop.el.style.filter = dist < 100 ? "blur(2px)" : "none";
  });
});

// Optional: Change speed dynamically
// Example: window.SPEED = 5; (or add a slider/input for user control)
