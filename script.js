/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play and pause
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update the play/pause button
function updateButton() {
    toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Update progress bar
function updateProgress() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percentage || 0}%`;
}

// Seek by clicking the progress bar
function scrub(event) {
    const percentage =
        (event.clientX - progress.getBoundingClientRect().left) /
        progress.offsetWidth;

    video.currentTime = percentage * video.duration;
}

// Change volume
function handleVolumeChange() {
    video.volume = Number(volume.value);
}

// Change playback speed
function handleSpeedChange() {
    video.playbackRate = Number(playbackSpeed.value);
}

// Skip forward or backward
function skip() {
    video.currentTime += Number(this.dataset.skip);
}

// Event listeners
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgress);

volume.addEventListener("input", handleVolumeChange);
playbackSpeed.addEventListener("input", handleSpeedChange);

skipButtons.forEach(button => {
    button.addEventListener("click", skip);
});

progress.addEventListener("click", scrub);

// Initialize the button state
updateButton();