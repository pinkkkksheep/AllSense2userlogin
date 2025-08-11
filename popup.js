
 
  // Slideshow for section 0
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('#section0 .slide');
  let currentSlide = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      const img = slide.querySelector('.slide-img');
      const audio = slide.querySelector('.slide-audio');

      img.classList.toggle('active', i === idx);

      if (i === idx) {
        audio.currentTime = 0;
        audio.play().catch(() => {}); 
      } else {
        audio.pause();
        audio.currentTime = 0; 
      }
    });
  }

  showSlide(currentSlide);

  document.getElementById('prevSlide').addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  document.getElementById('nextSlide').addEventListener('click', function () {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    } else {
      transitionSection0To1();
    }
  });

  // Transition from section 0 to section 1(I used Copilot to help me with this transition function it was not working before, only o

  function transitionSection0To1() {
    const section0 = document.getElementById('section0');
    const section1 = document.getElementById('section1');

    section0.classList.add('slide-up');

    section0.addEventListener('animationend', () => {
      section0.classList.add('hidden');
      section1.classList.remove('hidden');
      section1.classList.add('fade-in');

      const section1Video = document.getElementById('section1Video');
      if (section1Video) {
        section1Video.muted = true;
        section1Video.currentTime = 0;
        
      }
    }, { once: true });
  }
});

// This is for section 1 to section 2
function initializeSection1() {
  const video = document.getElementById("section1Video");
  const audio = document.getElementById("section1Audio");
  const exitBtn = document.querySelector(".exit-btn1");
  const startBtn = document.getElementById("startSection1Btn");

 
  exitBtn.disabled = false;
  exitBtn.style.opacity = "1";
  exitBtn.style.cursor = "pointer";
  exitBtn.textContent = "Exit";

  let videoEnded = false;
  let audioEnded = false;

  function checkMediaCompletion() {
    if (videoEnded && audioEnded) {
      console.log("Both media ended.");
    
    }
  }

  video.addEventListener("ended", () => {
    videoEnded = true;
    checkMediaCompletion();
  });

  audio.addEventListener("ended", () => {
    audioEnded = true;
    checkMediaCompletion();
  });

  function startMedia() {
    videoEnded = false;
    audioEnded = false;

    video.currentTime = 0;
    audio.currentTime = 0;

    const videoPlayPromise = video.play();
    const audioPlayPromise = audio.play();

    Promise.all([videoPlayPromise, audioPlayPromise])
      .then(() => {
        console.log("Both media started successfully");
      })
      .catch((error) => {
        console.warn("Media playback error:", error);
      });
  }

  // This for the Play button to triggers media start and hides itself
  startBtn.addEventListener("click", () => {
    startMedia();
    startBtn.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSection1();
});

function exitSection() {
  const section1 = document.getElementById("section1");
  const section2 = document.getElementById("section2");
  const section1Audio = document.getElementById("section1Audio");
  const section1Video = document.getElementById("section1Video");

  
  if (section1Audio) {
    section1Audio.pause();
    section1Audio.currentTime = 0;
  }
  if (section1Video) {
    section1Video.pause();
    section1Video.currentTime = 0;
  }

  
  const newSection1 = section1.cloneNode(true);
  section1.parentNode.replaceChild(newSection1, section1);

 
  newSection1.classList.remove("slide-up");

  void newSection1.offsetWidth;


  newSection1.classList.add("slide-up");


  newSection1.addEventListener("animationend", () => {
    newSection1.classList.add("hidden");
    section2.classList.remove("hidden");
    section2.classList.add("fade-in");

   
    section2.addEventListener("animationend", () => {
      section2.classList.remove("fade-in");
    }, { once: true });
  }, { once: true });
}




//this is for section 2 to 3 
function goToMap() {
  console.log("goToMap called"); //I used Copilot to help me fix this function, only one functuion was working at one time, when the funtion for section 1 to 2 was working this function is not, so copilot suggested to me to use "console.log("goToMap called");" which helped me debug the issue
  const section2 = document.getElementById("section2");
  const section3 = document.getElementById("section3");

  section2.classList.add("slide-up");

  section2.addEventListener("animationend", () => {
    section2.classList.add("hidden");
    section3.classList.remove("hidden");
    section3.classList.add("fade-in");
    section3.addEventListener("animationend", () => {
      section3.classList.remove("fade-in");
    }, { once: true });
  }, { once: true });
}

// This is for section 3 to section 4
document.addEventListener('DOMContentLoaded', function () {
  const map1Button = document.getElementById('map1');
  const section3 = document.getElementById('section3');
  const section4 = document.getElementById('section4');

  map1Button.addEventListener('click', function () {
    section3.classList.add('hidden');
    section4.classList.remove('hidden');
  });
});

// This is for section 4 to section 5
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('locationVideo');
  const section4 = document.getElementById('section4');
  const section5 = document.getElementById('section5');
  let playCount = 0;

  const observer = new MutationObserver(() => {
    if (!section4.classList.contains('hidden')) {
      playCount = 0;
      video.currentTime = 0;
      video.play();
    }
  });
  observer.observe(section4, { attributes: true, attributeFilter: ['class'] });

  video.addEventListener('ended', function () {
    playCount++;
    if (playCount < 2) {
      video.currentTime = 0;
      video.play();
    } else {
      section4.classList.add('hidden');
      section5.classList.remove('hidden');
      section5.classList.add('fade-in');
      section5.addEventListener('animationend', () => {
        section5.classList.remove('fade-in');
      }, { once: true });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Section 5 -> Section 6 transition 
  const startBtn = document.getElementById('startBtn');
  const section5 = document.getElementById('section5');
  const section6 = document.getElementById('section6');
  const section6Video = document.getElementById('locationVideo6');

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      section5.classList.add('hidden');
      section6.classList.remove('hidden');
      section6.classList.add('fade-in');
      section6.addEventListener('animationend', () => {
        section6.classList.remove('fade-in');
      }, { once: true });

    });
  }

  // This is for Section 6
  const section6_1 = document.getElementById('section6-1');
  const video6 = document.getElementById('locationVideo6');
  const audio6 = document.getElementById('locationAudio6');
  const playBtn6 = document.getElementById('startSection1Btn6');

  if (playBtn6 && video6 && audio6) {
    playBtn6.addEventListener('click', () => {
      video6.currentTime = 0;
      audio6.currentTime = 0;

      video6.play().catch(err => console.error('Video6 play error:', err));
      audio6.play().catch(err => console.error('Audio6 play error:', err));

      playBtn6.style.display = 'none';
    });

    //This is for  When section 6 video ends, transition to section 6.1
    video6.addEventListener('ended', () => {
      
      audio6.pause();

      section6.classList.add('hidden');
      if (section6_1) {
        section6_1.classList.remove('hidden');
        section6_1.classList.add('fade-in');
        section6_1.addEventListener('animationend', () => {
          section6_1.classList.remove('fade-in');
        }, { once: true });
      }
    });
  }

  // for Section 6.1 video to autoplay 
  const video6_1 = document.getElementById('locationVideo6-1');
  const section7 = document.getElementById('section7');
  const video7 = document.getElementById('section7Video');

  if (section6_1 && video6_1) {
    const observer6_1 = new MutationObserver(() => {
      if (!section6_1.classList.contains('hidden')) {
        video6_1.muted = true;
        video6_1.currentTime = 0;
        video6_1.play().catch(err => console.error('Video6_1 play error:', err));
      }
    });
    observer6_1.observe(section6_1, { attributes: true, attributeFilter: ['class'] });

    video6_1.addEventListener('ended', () => {
      section6_1.classList.add('hidden');

      if (section7) {
        section7.classList.remove('hidden');
        section7.classList.add('fade-in');
        section7.addEventListener('animationend', () => {
          section7.classList.remove('fade-in');
        }, { once: true });
      }

      if (video7) {
        video7.currentTime = 0;
        video7.play().catch(err => console.error('Video7 play error:', err));
      }
    });
  }
});



// This is for section 7 to section 8
document.addEventListener('DOMContentLoaded', () => {
  const section7 = document.getElementById('section7');
  const section8 = document.getElementById('section8');
  const video7 = document.getElementById('section7Video');
  const audio7 = document.getElementById('section7Audio');

  if (video7 && audio7) {
 
    video7.addEventListener('play', () => {
      audio7.currentTime = video7.currentTime;
      audio7.play().catch(err => console.error('Audio7 play error:', err));
    });

 
    video7.addEventListener('pause', () => {
      audio7.pause();
    });

    
    video7.addEventListener('timeupdate', () => {
      if (Math.abs(video7.currentTime - audio7.currentTime) > 0.3) {
        audio7.currentTime = video7.currentTime;
      }
    });

    //This is for When video ends, transition to section 8 a
    video7.addEventListener('ended', () => {
      audio7.pause();

      section7.classList.add('hidden');
      section8.classList.remove('hidden');
      section8.classList.add('fade-in');

      section8.addEventListener('animationend', () => {
        section8.classList.remove('fade-in');
      }, { once: true });
    });
  }
});


// Exit button for Section 8
document.getElementById('exitForum8').addEventListener('click', function () {
  window.location.href = 'index.html'; // This will Redirect back  to index.html forming a loop
});
