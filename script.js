const gallery = document.querySelector('.card-gallery');
const addButton = document.querySelector('.add');
const menuButton = document.querySelector('.book');
const screenBlur = document.querySelector('.blur');
const popup = document.querySelector('.form-popup')
const hiddenButtons = Array.from(document.querySelectorAll('.hidden'));
const books = [];
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

menuButton.addEventListener('click', () => {
  screenBlur.classList.toggle('active');

    hiddenButtons.forEach(button => {
      button.classList.toggle('hidden');
    });
});

screenBlur.addEventListener('click', () => {
  console.log('lmao');
})

addButton.addEventListener('click', () => {
  popup.classList.toggle('active');
});

// addButton.addEventListener('click', () => {
//   screenBlur.classList.toggle('active');

//   hiddenButtons.forEach(button => {
//     button.classList.add('hidden');
//   })

//   const currentDate = new Date();

//   currentCard = document.createElement('div');
//   currentCard.classList.add('card');
//   currentCard.dataset.index = counter;

//   gallery.appendChild(currentCard);
//   books[counter] = new Book('The Hobbit', 'J.R.R Tolkiens', '299', currentDate);
//   books[counter].index = document.querySelector(`div[data-index="${counter}"]`);
  
//   for(const property in books[counter]) {
//     if(property != 'index') {
//       p = document.createElement('p');
//       p.textContent = `${property}: ${books[counter][property]}`;
//       books[counter].index.appendChild(p);
//     }
//   }

//   counter += 1;
// })