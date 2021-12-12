let bookList = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
localStorage.setItem('books', JSON.stringify(bookList));

window.addEventListener('load', () => {
  displayBooks();
})

// ------------------------- MENU -------------------------

const menuBtn = document.getElementById('menu');
const addBtn = document.getElementById('add');
const themeBtn = document.getElementById('theme');

menuBtn.addEventListener('click', () => {
  toggleMenu();
});

  function toggleMenu() {
    addBtn.classList.toggle('hidden'); 
    themeBtn.classList.toggle('hidden');
    toggleBlur();
  }
  function toggleBlur() {
    document.querySelector('.menu').classList.toggle('blurred');
  }

addBtn.addEventListener('click', () => {
  togglePopupForm(); 
})

  function togglePopupForm() {
    document.querySelector('form').classList.toggle('hidden');
  }

themeBtn.addEventListener('click', () => {
  console.log('dark mode');
});

// ------------------------- POPUP FORM -------------------------

const cancelBtn = document.querySelector('.cancel');
const confirmBtn = document.querySelector('.confirm');

cancelBtn.addEventListener('click', () => {
  toggleMenu();
  togglePopupForm();
})

  function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = `${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`;
    this.finishedReading = false;
  }

  Book.prototype.displayInfo = function() {
    console.log('lmao');
  }

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMenu();
  togglePopupForm();

  const book = new Book(
    document.getElementById('title').value,
    document.getElementById('author').value,
    document.getElementById('pages').value,
  )

  bookList.push(book);
  localStorage.setItem('books', JSON.stringify(bookList));
})

const main = document.querySelector('.main');

function displayBooks() {
  while(main.lastElementChild) {
    main.removeChild(main.lastElementChild);
  }

  bookList.forEach(book => {
    createCard(book);
  })
}

  function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.book = book;
    main.append(card);

    book.displayInfo();
  }


