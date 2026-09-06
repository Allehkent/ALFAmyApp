/* ============================================
   ALFA Logistics - Bootstrap 5 JavaScript
   ============================================ */

let currentFrame = 0;
const totalFrames = 5;
const frameNumberEl = document.getElementById('frameNumber');
const deckTrackEl = document.getElementById('deckTrack');
const indicatorsEl = document.querySelectorAll('.indicator');
const slidesEl = document.querySelectorAll('.deck-slide');

let pointer = { x: 0, y: 0, id: null };
let swiped = false;

/* ============================================
   FRAME NAVIGATION
   ============================================ */

function updateFrame(newIndex) {
    currentFrame = Math.max(0, Math.min(totalFrames - 1, newIndex));
    
    // Update frame number display
    frameNumberEl.textContent = String(currentFrame + 1).padStart(2, '0');
    
    // Update slides visibility
    slidesEl.forEach((slide, index) => {
        if (index === currentFrame) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update indicators
    indicatorsEl.forEach((indicator, index) => {
        if (index === currentFrame) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Translate deck
    const translateValue = -currentFrame * 100;
    deckTrackEl.style.transform = `translateX(${translateValue}%)`;
}

function goToFrame(frameIndex) {
    updateFrame(frameIndex);
}

/* ============================================
   TOUCH/SWIPE NAVIGATION ONLY
   ============================================ */

const deckShell = document.getElementById('deckShell');

deckShell.addEventListener('pointerdown', (event) => {
    // Only track touch and stylus, not mouse
    if (event.pointerType === 'mouse') return;
    
    pointer = {
        x: event.clientX,
        y: event.clientY,
        id: event.pointerId
    };
    swiped = false;
});

deckShell.addEventListener('pointermove', (event) => {
    if (!pointer.id || event.pointerId !== pointer.id) return;
    
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    
    // Horizontal swipe detection (threshold: 12px)
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        event.preventDefault();
    }
});

deckShell.addEventListener('pointerup', (event) => {
    if (!pointer.id || event.pointerId !== pointer.id) {
        pointer.id = null;
        return;
    }
    
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    
    // Require at least 48px swipe distance
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) {
        pointer.id = null;
        return;
    }
    
    swiped = true;
    
    // Left swipe = next frame
    if (dx < 0) {
        if (currentFrame < totalFrames - 1) {
            updateFrame(currentFrame + 1);
        }
    }
    // Right swipe = previous frame
    else {
        if (currentFrame > 0) {
            updateFrame(currentFrame - 1);
        }
    }
    
    pointer.id = null;
});

deckShell.addEventListener('pointercancel', () => {
    pointer.id = null;
});

/* ============================================
   FORM HANDLING
   ============================================ */

// Track parcel input
const trackingInput = document.querySelector('.tracking-form input');
if (trackingInput) {
    trackingInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const parcelNumber = trackingInput.value.trim();
            if (parcelNumber) {
                console.log('Tracking parcel:', parcelNumber);
                alert(`Tracking parcel: ${parcelNumber}`);
            }
        }
    });
}

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize first frame
    updateFrame(0);
    
    // Add vibration support for mobile
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn') || e.target.closest('.indicator')) {
                navigator.vibrate(12);
            }
        });
    }
    
    console.log('ALFA Logistics App Initialized');
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

function pad(n) {
    return String(n).padStart(2, '0');
}
