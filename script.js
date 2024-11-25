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
  modal.show();
});

// Handle Avatar Selection
avatars.forEach((avatar) => {
  avatar.addEventListener("click", () => {
    avatars.forEach((av) => av.classList.remove("selected-avatar"));
    avatar.classList.add("selected-avatar");
    selectedAvatar = avatar.src;
  });
});

// Save Changes
document.getElementById("saveProfileChanges").addEventListener("click", () => {
  usernameField.textContent = newUsernameInput.value;
  profilePicField.src = selectedAvatar;
  modal.hide();
});
