const gallery = document.querySelector('.card-gallery');
const addButton = document.querySelector('.add-button');
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
  // console.log(this.date.getUTCDate());
  // console.log(this.date.getUTCMonth()+1);
  // console.log(this.date.getUTCFullYear());
}

addButton.addEventListener('click', () => {
  const currentDate = new Date();

  currentCard = document.createElement('div');
  currentCard.classList.add('card');
  currentCard.dataset.index = counter;

  gallery.appendChild(currentCard);
  books[counter] = new Book('The Hobbit', 'J.R.R Tolkiens', '299', currentDate);
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

// books[0] = new Book('the Hobbit', 'J.R.R Tolkiens');
// console.log(books[0].title, books[0].author)

// card = document.querySelector(`div[data-index="${0}"]`);
// h3 = document.createElement('h3');
// h3.textContent = "haha";
// card.appendChild(h3);


// addButton.addEventListener('click', () => {
// card = document.createElement('div');
// card.classList.add('card');
// card.dataset.index = 1;
// gallery.appendChild(card);

// })

// books[1] = document.querySelector(`div[data-index="${1}"]`)
