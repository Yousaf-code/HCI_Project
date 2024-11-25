// Messages and fake users for each community
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
    "Yoga Enthusiasts": {
      messages: [
        { text: "Welcome to the Yoga Enthusiasts community!", sender: "Taylor", likes: 3, likedByUser: false, own: false },
        { text: "What’s your favorite yoga pose?", sender: "Jordan", likes: 1, likedByUser: false, own: false },
      ],
      fakeUsers: [
        { name: "Jamie", messages: ["Child’s pose is so relaxing.", "Yoga is the best for flexibility."] },
        { name: "Alex", messages: ["Have you tried sun salutations? They're amazing!", "Yoga helps me stay calm and focused."] },
      ],
    },
    "Healthy Eating": {
      messages: [
        { text: "Welcome to the Healthy Eating community!", sender: "Jamie", likes: 4, likedByUser: false, own: false },
        { text: "Quick question: what's a healthy snack?", sender: "Alex", likes: 6, likedByUser: false, own: false },
      ],
      fakeUsers: [
        { name: "Taylor", messages: ["Greek yogurt with berries is a great snack!", "Try avocado toast for breakfast."] },
        { name: "Jordan", messages: ["I love making green smoothies in the morning.", "Oats are so versatile and healthy!"] },
      ],
    },
    "10K Step Challenge": {
      messages: [
        { text: "Welcome to the 10K Step Challenge community!", sender: "Taylor", likes: 7, likedByUser: false, own: false },
        { text: "I walked 12K steps today. Beat that!", sender: "Jordan", likes: 3, likedByUser: false, own: false },
      ],
      fakeUsers: [
        { name: "Jamie", messages: ["Walking after meals helps with digestion.", "Try exploring new routes to make walking fun."] },
        { name: "Alex", messages: ["I hit 15K steps yesterday. Feeling great!", "Walking in nature is so refreshing."] },
      ],
    },
    "Hydration Hacks": {
      messages: [
        { text: "Welcome to the Hydration Hacks community!", sender: "Alex", likes: 2, likedByUser: false, own: false },
        { text: "Drink at least 2 liters daily!", sender: "Taylor", likes: 9, likedByUser: false, own: false },
      ],
      fakeUsers: [
        { name: "Jamie", messages: ["Start your day with a glass of water.", "Add lemon to your water for a refreshing twist."] },
        { name: "Jordan", messages: ["I use a water tracker to stay consistent.", "Dehydration can affect your energy levels."] },
      ],
    },
  };
  
  // Current community state
  let currentCommunity = "Workout Tips";
  let messages = communityChats[currentCommunity].messages;
  let fakeUsers = communityChats[currentCommunity].fakeUsers;
  
  // Function to render messages on the chat canvas
  function renderMessages() {
    const chatCanvas = document.getElementById("chat-canvas");
    chatCanvas.innerHTML = ""; // Clear the canvas
  
    messages.forEach((message, index) => {
      // Create a div for the chat message
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("chat-message");
      if (message.own) messageDiv.classList.add("own");
  
      // Add the message content
      messageDiv.innerHTML = `
        <span><strong>${message.sender}:</strong> ${message.text}</span>
        <div class="message-actions">
          <button 
            class="action-button" 
            onclick="toggleLike(${index})"
          >
            ❤️ ${message.likes}
          </button>
          ${
            message.own
              ? `<button class="action-button delete" onclick="deleteMessage(${index})">
                  🗑 Delete
                </button>`
              : ""
          }
        </div>
      `;
  
      // Append the message to the chat canvas
      chatCanvas.appendChild(messageDiv);
    });
  
    // Scroll to the bottom of the chat canvas
    chatCanvas.scrollTop = chatCanvas.scrollHeight;
  }
  
  // Function to send a new message (from the user)
  function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const text = chatInput.value.trim();
  
    if (text !== "") {
      // Add the new message to the current community's messages array
      messages.push({ text: text, sender: "You", likes: 0, likedByUser: false, own: true });
      chatInput.value = ""; // Clear the input field
  
      // Re-render messages
      renderMessages();
    }
  }
  
  // Function to delete a message (user can only delete their own messages)
  function deleteMessage(index) {
    messages.splice(index, 1); // Remove the message from the array
    renderMessages(); // Re-render messages
  }
  
  // Function to toggle likes (like or unlike a message)
  function toggleLike(index) {
    if (messages[index].likedByUser) {
      // Unlike the message
      messages[index].likes--;
      messages[index].likedByUser = false;
    } else {
      // Like the message
      messages[index].likes++;
      messages[index].likedByUser = true;
    }
    renderMessages(); // Re-render messages
  }
  
  // Function to load a different community
  function loadCommunity(communityName) {
    currentCommunity = communityName;
    messages = communityChats[currentCommunity].messages;
    fakeUsers = communityChats[currentCommunity].fakeUsers;
  
    renderMessages();
  }
  
  // Function to simulate fake users sending messages
  function simulateFakeMessages() {
    if (fakeUsers.length > 0) {
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomMessage =
        randomUser.messages[Math.floor(Math.random() * randomUser.messages.length)];
  
      // Add the fake user's message to the current community's messages array
      messages.push({ text: randomMessage, sender: randomUser.name, likes: 0, likedByUser: false, own: false });
  
      // Re-render messages
      renderMessages();
    }
  }
  
  // Event listener for the send button
  document.getElementById("send-button").addEventListener("click", sendMessage);
  
  // Allow pressing "Enter" to send a message
  document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  
  // Initial rendering of the default community
  renderMessages();
  
  // Simulate fake users sending messages every 2-3 seconds
  setInterval(simulateFakeMessages, Math.random() * (3000 - 2000) + 2000);
  