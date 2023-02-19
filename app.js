class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  // Method that loops over all the pads
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check if pads are active
      if (bar.classList.contains("active")) {
        // check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  // A method that controls how fast the pads are looped over depending on the bpm set.
  start() {
    const interval = (60 / this.bpm) * 1000;
    // Check if sound is playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // Clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  // Update the button to Stop after 'play' has been clicked
  updateButton() {
    if (!this.isPlaying) {
      this.playButton.innerText = "Pause";
    } else {
      this.playButton.innerText = "Play";
    }
  }

  // A method that adds the active class to the pad on click
  activePad() {
    this.classList.toggle("active");
  }
}

// Create an instance of an object
const drumKit = new DrumKit();

// Loop over the pads and run activePad method for any that is clicked
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.updateButton();
  drumKit.start();
});
