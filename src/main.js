import './style.css';

const addFriendForm = document.getElementById('add-friend-form');
const friendNameInput = document.getElementById('friend-name');
const friendsList = document.getElementById('friends-list');
const drawFriendButton = document.getElementById('draw-friend');
const secretFriendResult = document.getElementById('secret-friend-result');

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

const shufflePopup = document.getElementById('shuffle-popup');
const shuffleName = document.getElementById('shuffle-name');

let friends = [];

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.add('visible');
}

function hidePopup() {
  popup.classList.remove('visible');
}

function showShufflePopup() {
  shufflePopup.classList.add('visible');
}

function hideShufflePopup() {
  shufflePopup.classList.remove('visible');
}

function renderFriends() {
  friendsList.innerHTML = '';
  friends.forEach(friend => {
    const li = document.createElement('li');
    li.textContent = friend;
    friendsList.appendChild(li);
  });
}

function drawSecretFriend() {
  if (friends.length < 2) {
    showPopup('You need at least two friends to draw.');
    return;
  }

  showShufflePopup();
  let shuffleCount = 0;
  const maxShuffles = 20;

  const shuffleInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * friends.length);
    shuffleName.textContent = friends[randomIndex];
    shuffleCount++;

    if (shuffleCount >= maxShuffles) {
      clearInterval(shuffleInterval);
      performDraw();
    }
  }, 100);
}

function performDraw() {
  const remainingFriends = [...friends];
  let secretFriend = '';

  if (remainingFriends.length > 1) {
    const randomIndex = Math.floor(Math.random() * remainingFriends.length);
    secretFriend = remainingFriends.splice(randomIndex, 1)[0];
  }

  shuffleName.textContent = secretFriend;

  setTimeout(() => {
    hideShufflePopup();
    secretFriendResult.textContent = secretFriend;
    secretFriendResult.classList.add('glitch-text-2');
    setTimeout(() => {
      secretFriendResult.classList.remove('glitch-text-2');
    }, 2000);
  }, 1000);
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

drawFriendButton.addEventListener('click', drawSecretFriend);
closePopupButton.addEventListener('click', hidePopup);