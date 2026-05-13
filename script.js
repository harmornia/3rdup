// positions array: maps [cardIndex] -> visual slot (0=far-left … 4=far-right)
// initial state: card 2 is center (slot 2)
let positions = [0, 1, 2, 3, 4]; // positions[cardIndex] = slot
const CENTER = 2;
const TOTAL  = 5;

function rotateTo(clickedIndex) {
  const currentCenter = positions.indexOf(CENTER);
  if (clickedIndex === currentCenter) return;

  const diff = clickedIndex - currentCenter;

  // Shift all cards
  const newPositions = positions.map((slot, i) => {
    let next = slot - diff;
    // wrap around
    if (next < 0) next += TOTAL;
    if (next >= TOTAL) next -= TOTAL;
    return next;
  });

  positions = newPositions;
  applyPositions();
  updateDots();
}

function applyPositions() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.setAttribute('data-pos', positions[i]);
    card.classList.toggle('active', positions[i] === CENTER);
  });
}

function updateDots() {
  const activeCard = positions.indexOf(CENTER);
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeCard);
  });
}

// Auto-advance
let autoTimer = setInterval(() => {
  const currentCenter = positions.indexOf(CENTER);
  const next = (currentCenter + 1) % TOTAL;
  rotateTo(next);
}, 3000);

document.querySelector('.slider-scene').addEventListener('mouseenter', () => clearInterval(autoTimer));
document.querySelector('.slider-scene').addEventListener('mouseleave', () => {
  autoTimer = setInterval(() => {
    const currentCenter = positions.indexOf(CENTER);
    rotateTo((currentCenter + 1) % TOTAL);
  }, 3000);
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    const c = positions.indexOf(CENTER);
    rotateTo((c - 1 + TOTAL) % TOTAL);
  }
  if (e.key === 'ArrowRight') {
    const c = positions.indexOf(CENTER);
    rotateTo((c + 1) % TOTAL);
  }
});
