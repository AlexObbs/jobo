document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play-button');
  const video = document.getElementById('video');
  const options = document.querySelectorAll('.option');

  playButton.addEventListener('click', () => {
    video.play();
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const optionNumber = option.getAttribute('data-option');
      alert(`Option ${optionNumber} selected`);
      // Add functionality to change images and video based on the option selected
    });
  });
});
