console.log("✅ script.js loaded");

let storyData;

// Focus input box when page loads
function focusNameInput() {
  document.getElementById("name-input").focus();
}

// Check if entered name is "kishmish"
function checkName() {
  const input = document.getElementById("name-input").value.trim().toLowerCase();

  if (input === "kishmish") {
    document.getElementById("name-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    // Show a welcome message
    document.getElementById("welcome-message").innerText = "Welcome, Kishmish ❤️";

    // Start the story
    loadStory();
  } else {
    document.getElementById("name-error").style.display = "block";
  }
}

// Load story JSON
async function loadStory() {
  try {
    const res = await fetch('story.json');
    storyData = await res.json();
    showNode("start");
  } catch (err) {
    document.getElementById("story-text").innerText = "❌ Failed to load story.";
    console.error("❌ Error loading story:", err);
  }
}

// Display a specific story node
function showNode(nodeId) {
  const node = storyData[nodeId];

  // Update story text
  document.getElementById("story-text").innerText = node.text;

  // Get image and video elements
  const img = document.getElementById("story-image");
  const video = document.getElementById("story-video");

  // Display video if .mp4
  if (node.image && node.image.endsWith(".mp4")) {
    img.style.display = "none";
    img.src = "";

    video.style.display = "block";
    video.src = node.image;
    video.load();
    video.play();

  } else if (node.image) {
    // Display image
    video.style.display = "none";
    video.pause();
    video.src = "";

    img.style.display = "block";
    img.src = node.image;

  } else {
    // No media
    img.style.display = "none";
    img.src = "";
    video.style.display = "none";
    video.pause();
    video.src = "";
  }

  // Show choices
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  node.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => showNode(choice.next);
    choicesContainer.appendChild(btn);
  });
}


