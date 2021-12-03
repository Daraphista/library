const gallery = document.querySelector('.card-gallery');
const addButton = document.querySelector('.add-button');
const books = [];
const counter = 1;
let h3;
let card;

function Book(title, author, pages, status, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

addButton.addEventListener('click', () => {
  card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = counter;

  gallery.appendChild(card);
  books[counter] = new Book('The Hobbit', 'J.R.R Tolkiens', '299');
  books[counter].index = document.querySelector(`div[data-index="${counter}"]`);
  
  for(const property in books[counter]) {
    p = document.createElement('p');
    p.textContent = `${property}: ${books[counter][property]}`;
    books[counter].index.appendChild(p);
  }
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
