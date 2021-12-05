const gallery = document.querySelector('.card-gallery');
let counter = 1;
let h3;
let currentCard;

function Card(index) {
  this.index = index;
}

Book.prototype = Object.create(Card.prototype);

function Book(title, author, pages, currentDate) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this['date added'] = `${currentDate.getUTCDate()}/${currentDate.getUTCMonth()}/${currentDate.getUTCFullYear()}`;
}

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
const books = [];
const cancel = document.querySelector('.cancel');
const confirmBtn = document.querySelector('.confirm');

cancel.addEventListener('click', () => {
  togglePopup();
  toggleMenu();
})

function createCard() {
  currentCard = document.createElement('div');
  currentCard.classList.add('card');
  currentCard.dataset.index = counter;
  gallery.appendChild(currentCard);
  
  return currentCard
}

confirmBtn.addEventListener('click', () => {
  togglePopup();
  toggleMenu();
  
  const currentDate = new Date();
  
  currentCard = createCard();
  
  books[counter] = new Book(
    `${document.getElementById('title').value}`,
    `${document.getElementById('author').value}`,
    `${document.getElementById('pages').value}`,
    currentDate
    );
    
    books[counter].index = document.querySelector(`div[data-index="${counter}"]`);
    
    
    for(const property in books[counter]) {
      if(property != 'index') {
        p = document.createElement('p');
        p.textContent = `${property}: ${books[counter][property]}`;
        books[counter].index.appendChild(p);
      }
    }
    
    counter += 1;
  })