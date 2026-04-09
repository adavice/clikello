// Custom pixelated cursor and delayed invader follower
const INVADER_SRC = 'img/invader.svg';
const CURSOR_SIZE = 12;
const FOLLOWER_SIZE = 48;
const LERP = 0.12;

const cursorEl = document.createElement('div');
Object.assign(cursorEl.style, {
  position: 'fixed',
  width: CURSOR_SIZE + 'px',
  height: CURSOR_SIZE + 'px',
  borderRadius: '2px',
  background: '#000',
  mixBlendMode: 'difference',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  zIndex: 999999,
  imageRendering: 'pixelated'
});

// Use a masked div so we can color the invader via CSS variables
const follower = document.createElement('div');
Object.assign(follower.style, {
  position: 'fixed',
  width: FOLLOWER_SIZE + 'px',
  height: FOLLOWER_SIZE + 'px',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  zIndex: 999998,
  imageRendering: 'pixelated',
  // Color using the site's --primary variable and make it a bit darker
  backgroundColor: 'var(--primary, #000)',
  filter: 'brightness(0.8)',
  // Use the SVG as a mask so the div takes the SVG shape and inherits the background color
  maskImage: `url(${INVADER_SRC})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: `url(${INVADER_SRC})`,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center'
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(follower);
  document.body.appendChild(cursorEl);
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let fx = mouseX;
let fy = mouseY;

function onMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorEl.style.left = mouseX + 'px';
  cursorEl.style.top = mouseY + 'px';
}

function onLeave() {
  cursorEl.style.display = 'none';
  follower.style.display = 'none';
}

function onEnter() {
  cursorEl.style.display = '';
  follower.style.display = '';
}

window.addEventListener('mousemove', onMove);
window.addEventListener('mouseenter', onEnter);
window.addEventListener('mouseleave', onLeave);

function animate() {
  fx += (mouseX - fx) * LERP;
  fy += (mouseY - fy) * LERP;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Optional: click pulse on follower
window.addEventListener('mousedown', () => {
  follower.style.transform = 'translate(-50%, -50%) scale(0.9)';
});
window.addEventListener('mouseup', () => {
  follower.style.transform = 'translate(-50%, -50%) scale(1)';
});
