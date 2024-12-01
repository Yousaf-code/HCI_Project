// Chat data for each community
const communityChats = {
  "Workout Tips": {
      messages: [
          { text: "Welcome to the Workout Tips community!", sender: "Alex", likes: 2, likedByUser: false, own: false },
          { text: "Anyone has tips for improving squats?", sender: "Jamie", likes: 5, likedByUser: false, own: false },
      ],
      fakeUsers: [
          { name: "Taylor", messages: ["Stretch before lifting to avoid injuries.", "Progressive overload is the key to gains."] },
          { name: "Jordan", messages: ["Focus on form before adding more weight.", "Do compound exercises like squats and deadlifts!"] },
      ],
  },
  // Other communities follow the same pattern...
};

// Keep track of the current community
let currentCommunity = "Workout Tips";
let messages = communityChats[currentCommunity].messages;
let fakeUsers = communityChats[currentCommunity].fakeUsers;

// Show messages in the chat
function renderMessages() {
  const chatCanvas = document.getElementById("chat-canvas");
  chatCanvas.innerHTML = ""; // Clear previous content

  messages.forEach((message, index) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("chat-message");
      if (message.own) messageDiv.classList.add("own");

      messageDiv.innerHTML = `
          <span><strong>${message.sender}:</strong> ${message.text}</span>
          <div class="message-actions">
              <button class="action-button" onclick="toggleLike(${index})">❤️ ${message.likes}</button>
              ${message.own ? `<button class="action-button delete" onclick="deleteMessage(${index})">🗑 Delete</button>` : ""}
          </div>
      `;
      chatCanvas.appendChild(messageDiv);
  });

  chatCanvas.scrollTop = chatCanvas.scrollHeight; // Keep the latest messages in view
}

// Add a new message
function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const text = chatInput.value.trim();

  if (text) {
      messages.push({ text, sender: "You", likes: 0, likedByUser: false, own: true });
      chatInput.value = ""; // Clear input
      renderMessages();
  }
}

// Remove a user's own message
function deleteMessage(index) {
  messages.splice(index, 1);
  renderMessages();
}

// Like or unlike a message
function toggleLike(index) {
  const message = messages[index];
  message.likedByUser = !message.likedByUser;
  message.likes += message.likedByUser ? 1 : -1;
  renderMessages();
}

// Switch between communities
function loadCommunity(communityName) {
  currentCommunity = communityName;
  messages = communityChats[currentCommunity].messages;
  fakeUsers = communityChats[currentCommunity].fakeUsers;

  document.getElementById("community-tab-title").textContent = currentCommunity;
  renderMessages();
}

// Simulate fake users posting messages
function simulateFakeMessages() {
  if (fakeUsers.length) {
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomMessage = randomUser.messages[Math.floor(Math.random() * randomUser.messages.length)];

      messages.push({ text: randomMessage, sender: randomUser.name, likes: 0, likedByUser: false, own: false });
      renderMessages();
  }
}

// Set up event listeners
document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") sendMessage();
});

// Initial setup
renderMessages();
setInterval(simulateFakeMessages, Math.random() * (3000 - 2000) + 2000);
