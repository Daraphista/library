
// -------------------------menu functionality--------------------------- 
const hiddenButtons = Array.from(document.querySelectorAll('.hidden'));
const addButton = document.querySelector('.add');
const menuButton = document.querySelector('.book');
const screenBlur = document.querySelector('.blur');
const popup = document.querySelector('.form-popup');

function toggleMenu() {
  screenBlur.classList.toggle('active');
  
  hiddenButtons.forEach(button => {
    button.classList.toggle('hidden');
  });
}

function togglePopup() {
  popup.classList.toggle('active');
}

menuButton.addEventListener('click', () => {
  toggleMenu();
});

addButton.addEventListener('click', () => {
  togglePopup();
});

// -----------------------popup functionality--------------------------
const cancel = document.querySelector('.cancel');
const confirmBtn = document.querySelector('.confirm');

cancel.addEventListener('click', () => {
  togglePopup();
  toggleMenu();
})

function createCard(counter) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = counter;
  gallery.appendChild(card);
  
  return card;
}

// ----------------------------gallery functionality--------------------
const gallery = document.querySelector('.card-gallery');
// const books = [];
let counter = 1;
let h3;

const Input = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  pages: document.getElementById('pages'),
}

function addBookCount() {
  if(typeof(Storage) !== "undefined") {
    if (localStorage.counter) {
      localStorage.counter = Number(localStorage.counter)+1;
    } else {
      localStorage.counter = 0;
    }
  }
}

function Book(title, author, pages, currentDate) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this['date added'] = `${currentDate.getUTCDate()}/${currentDate.getUTCMonth()+1}/${currentDate.getUTCFullYear()}`;
}

confirmBtn.addEventListener('click', () => {
  toggleMenu();
  togglePopup();
  addBookCount();

  const currentDate = new Date();

  newBook = new Book(
    `${Input.title.value}`,
    Input.author.value,
    Input.pages.value,
    currentDate
  );

  localStorage.setItem(`${localStorage.counter}`, JSON.stringify(newBook));
  updateGallery();
})

function updateGallery() {
  const cards = [];
  const books = [];

  while (gallery.lastElementChild) {
    gallery.removeChild(gallery.lastElementChild);
  }

  for(const property in localStorage) {
    if(/[0-9]/.test(property)) {
      cards.push(createCard(property));
    }
  }

  for(const property in localStorage) {
    if(/[0-9]/.test(property)) {
      books.push(JSON.parse(localStorage[property]));
    }
  }
  
  for(i = 0; i < cards.length; i++){
    for(const property in books[i]) {
      para = document.createElement('p');
      para.textContent = `${property}: ${books[i][property]}`;
      cards[i].appendChild(para);
    }
  }
}
