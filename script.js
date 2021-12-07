
window.addEventListener('load', () => {
  updateGallery();
  if(localStorage.books === undefined) {
    const books = [];
    localStorage.setItem('books', JSON.stringify(books));
  }
})


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

// ----------------------------gallery functionality--------------------
const gallery = document.querySelector('.card-gallery');

let h3;

const Input = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  pages: document.getElementById('pages'),
}

function Book(title, author, pages, currentDate, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this['date added'] = `${currentDate.getUTCDate()}/${currentDate.getUTCMonth()+1}/${currentDate.getUTCFullYear()}`;
  this.readStatus = readStatus;
}

const books = JSON.parse(localStorage.books);

confirmBtn.addEventListener('click', () => {
  toggleMenu();
  togglePopup();
  
  const currentDate = new Date();
  
  newBook = new Book(
    Input.title.value,
    Input.author.value,
    Input.pages.value,
    currentDate,
    false
    );
    
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    Input.title.value = '';
    Input.author.value = '';
    Input.pages.value = '';
    
    updateGallery();
})
  
function updateGallery() {
  while (gallery.lastElementChild) {
    gallery.removeChild(gallery.lastElementChild);
  }
  
  
  const bookArray = JSON.parse(localStorage.books);
  
  bookArray.forEach(book => {
    createCard(bookArray.indexOf(book), book);
  })
}
    
function createCard(bookIndex, bookObj) {
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.dataset.index = bookIndex;
  gallery.appendChild(newCard);

  const h2 = document.createElement('h2');
  h2.textContent = bookObj.title;
  newCard.appendChild(h2);

  const para1 = document.createElement('p');
  para1.textContent = bookObj.author;
  newCard.appendChild(para1);

  const para2 = document.createElement('p');
  para2.textContent = bookObj.pages;
  newCard.appendChild(para2);

  const para3 = document.createElement('p');
  para3.textContent = bookObj['date added'];
  newCard.appendChild(para3);

  const newDeleteBtn = document.createElement('button');
  newDeleteBtn.setAttribute('id', 'remove');
  newDeleteBtn.index = bookIndex;
  newDeleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
  newCard.appendChild(newDeleteBtn);

  const statusBtn = document.createElement('button');
  statusBtn.setAttribute('id', 'readStatus');
  statusBtn.index = bookIndex;
  statusBtn.textContent = (bookObj.readStatus) ? 'Finished!' : 'Unread';
  newCard.appendChild(statusBtn);
}
  
gallery.addEventListener('click', (e) => {
  if(e.target.id == 'remove') {
    result = confirm('Are you sure you want to delete this book?');
    if(result) {
      books.splice((e.target.index), 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  if(e.target.id == 'readStatus') {
    books[e.target.index].readStatus = (books[e.target.index].readStatus) ? false : true;
    localStorage.setItem('books', JSON.stringify(books));
  }

  updateGallery();
}, false)


