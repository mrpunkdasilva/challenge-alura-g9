import './style.css';

const addFriendForm = document.getElementById('add-friend-form');
const friendNameInput = document.getElementById('friend-name');
const friendsList = document.getElementById('friends-list');
const drawFriendButton = document.getElementById('draw-friend');
const secretFriendResult = document.getElementById('secret-friend-result');

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

let friends = [];

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove('hidden');
}

function hidePopup() {
  popup.classList.add('hidden');
}

addFriendForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const friendName = friendNameInput.value.trim();

  if (friendName === '') {
    showPopup('Please enter a valid name.');
    return;
  }
  
  if (friends.includes(friendName)) {
    showPopup(`'${friendName}' is already on the list.`);
    return;
  }

  friends.push(friendName);
  friendNameInput.value = '';
  renderFriends();
});

drawFriendButton.addEventListener('click', () => {
  if (friends.length < 2) {
    showPopup('You need at least two friends to draw.');
    return;
  }

  const randomIndex = Math.floor(Math.random() * friends.length);
  const secretFriend = friends[randomIndex];
  secretFriendResult.textContent = secretFriend;
  
  // Optional: Animate the result
  secretFriendResult.classList.add('glitch-text-2');
  setTimeout(() => {
      secretFriendResult.classList.remove('glitch-text-2');
  }, 2000);
});

function renderFriends() {
  friendsList.innerHTML = '';
  friends.forEach(friend => {
    const li = document.createElement('li');
    li.textContent = friend;
    friendsList.appendChild(li);
  });
}

closePopupButton.addEventListener('click', hidePopup);