const button = document.querySelector("#enter-button button");
const video = document.querySelector("#storm-video");
const content = document.querySelector("#intro-content");
const archive = document.querySelector("#archive");
const sound = document.querySelector("#sound");


const music = document.querySelector("#bg-music");
const musicButton = document.querySelector("#music-button");
const musicIcon = document.querySelector("#music-icon");

music.volume = 1;

function updateMusicIcon() {
    const isPlaying = !music.paused;

    musicIcon.src = isPlaying
    ? "galary/music-on.png"
    : "galary/music-off.png";

    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute(
        "aria-label",
        isPlaying ? "pause music" : "play music"
    );
}

button.addEventListener("click", () => {
    button.disabled = true;

    video.currentTime = 0;
    sound.currentTime = 0;

    video.play();
    sound.play() 

    music.play().then(updateMusicIcon).catch(console.error);

    content.classList.add("leaving");

    setTimeout(() => {
        archive.classList.add("visible");
    }, 1500);
});

musicButton.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(updateMusicIcon).catch(console.error);
  } else {
    music.pause();
    updateMusicIcon();
  }
});


// cards and hidden and sugges5tion button thingy

document.querySelectorAll(".archive-category").forEach((category) => {
  const viewMoreButton = category.querySelector(".view-more");
  const suggestionButton = category.querySelector(".suggestion-trigger");
  const extraItems = category.querySelectorAll(".archive-item.extra");
  const form = category.querySelector(".suggestion-form");

  suggestionButton.style.display = "none";

  viewMoreButton.addEventListener("click", () => {
    const isExpanded = viewMoreButton.getAttribute("aria-expanded") === "true";

    extraItems.forEach((item) => {

      item.hidden = isExpanded;

    });

    viewMoreButton.setAttribute("aria-expanded", String(!isExpanded));
    viewMoreButton.textContent = isExpanded ? "VIEW MORE" : "VIEW LESS"

    suggestionButton.style.display = isExpanded ? "none" : "inline-block";
    if (isExpanded) {
      form.classList.remove("show");
      suggestionButton.textContent = "SUGGEST A MOD";
    }
      
    
  });

  suggestionButton.addEventListener("click", () => {
    form.classList.toggle("show");

    suggestionButton.textContent = form.classList.contains("show")
    ? "CLOSE SUGGESTION" : "SUGGEST A MOD";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = form.querySelector(".form-message");
    const submitButton = form.querySelector('button[type = "submit"]');

    submitButton.textContent = "SENDING...";
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset(); 
        message.textContent = "Sugestion received. Thanks!";
      } else {
        message.textContent ="Could not send it. Please try again.";

      }
    }
    catch (error) {
      message.textContent = "Could not send it. Pls try again.";
    }

    submitButton.textContent = "SEND SUGGESTION";
    submitButton.disabled = false;
  }); 
});