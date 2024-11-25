// DOM Elements
const editProfileBtn = document.getElementById("editProfileBtn");
const modal = new bootstrap.Modal(document.getElementById("editProfileModal"));
const usernameField = document.getElementById("username");
const profilePicField = document.getElementById("profilePic");
const newUsernameInput = document.getElementById("newUsername");
const avatars = document.querySelectorAll(".selectable-avatar");
let selectedAvatar = profilePicField.src;

// Open Modal
editProfileBtn.addEventListener("click", () => {
  newUsernameInput.value = usernameField.textContent;
  // Preselect the current avatar
  avatars.forEach((avatar) => {
    avatar.classList.toggle("selected-avatar", avatar.src === profilePicField.src);
  });
  modal.show();
});

// Handle Avatar Selection
avatars.forEach((avatar) => {
  avatar.addEventListener("click", () => {
    avatars.forEach((av) => av.classList.remove("selected-avatar")); // Remove selection from others
    avatar.classList.add("selected-avatar"); // Highlight the clicked avatar
    selectedAvatar = avatar.src; // Update the selected avatar
  });
});

// Save Changes
document.getElementById("saveProfileChanges").addEventListener("click", () => {
  usernameField.textContent = newUsernameInput.value;
  profilePicField.src = selectedAvatar; // Update the profile picture
  modal.hide();
});
