/* ============================================
   ALFA Logistics - Bootstrap 5 JavaScript
   ============================================ */

let currentFrame = 0;
const totalFrames = 5;
const frameNumberEl = document.getElementById('frameNumber');
const deckTrackEl = document.getElementById('deckTrack');
const prevBtnEl = document.getElementById('prevBtn');
const nextBtnEl = document.getElementById('nextBtn');
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
    
    // Update buttons state
    prevBtnEl.disabled = currentFrame === 0;
    nextBtnEl.disabled = currentFrame === totalFrames - 1;
    
    // Translate deck
    const translateValue = -currentFrame * 100;
    deckTrackEl.style.transform = `translateX(${translateValue}%)`;
}

function nextFrame() {
    if (currentFrame < totalFrames - 1) {
        updateFrame(currentFrame + 1);
    }
}

function previousFrame() {
    if (currentFrame > 0) {
        updateFrame(currentFrame - 1);
    }
}

function goToFrame(frameIndex) {
    updateFrame(frameIndex);
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextFrame();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousFrame();
    } else if (event.key === 'Home') {
        event.preventDefault();
        updateFrame(0);
    } else if (event.key === 'End') {
        event.preventDefault();
        updateFrame(totalFrames - 1);
    } else if (event.key === ' ') {
        event.preventDefault();
        // Space key can trigger tracking button on frame 3
        if (currentFrame === 3) {
            const trackBtn = document.querySelector('[onclick*="Track parcel"]');
            if (trackBtn) trackBtn.click();
        }
    }
});

/* ============================================
   TOUCH & POINTER EVENTS
   ============================================ */

const deckShell = document.getElementById('deckShell');

deckShell.addEventListener('pointerdown', (event) => {
    // Ignore right-click and non-primary buttons
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    
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
        nextFrame();
    }
    // Right swipe = previous frame
    else {
        previousFrame();
    }
    
    pointer.id = null;
});

deckShell.addEventListener('pointercancel', () => {
    pointer.id = null;
});

/* ============================================
   BUTTON EVENT LISTENERS
   ============================================ */

// Prevent button click if user was swiping
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (swiped) {
            e.preventDefault();
            swiped = false;
        }
    });
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
                // Show success message or redirect
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
            if (e.target.closest('.btn') || e.target.closest('.indicator') || e.target.closest('.nav-btn')) {
                navigator.vibrate(12);
            }
        });
    }
    
    // Log initialization
    console.log('ALFA Logistics App Initialized');
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Pad numbers with leading zeros
function pad(n) {
    return String(n).padStart(2, '0');
}

// Get current frame label
function getCurrentFrameLabel() {
    const labels = ['Homepage', 'Three Pillars', 'Quick Links', 'Parcel Tracking', 'About'];
    return labels[currentFrame] || 'Unknown';
}

// Log analytics (optional)
function logFrameChange(fromFrame, toFrame) {
    console.log(`Frame changed: ${pad(fromFrame + 1)} → ${pad(toFrame + 1)}`);
}
