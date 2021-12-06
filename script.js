
window.addEventListener('load', () => {
  updateGallery();

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

function createCard(counter, bookObject) {
  let card = document.createElement('div');
  card.bookObject = bookObject;
  card.classList.add('card');
  card.dataset.index = counter;
  gallery.appendChild(card);
  
  const removeButton = document.createElement('button');
  removeButton.setAttribute('id', 'remove');
  removeButton.innerHTML = `<i class="fas fa-times"></i>`;
  card.appendChild(removeButton);

  return card;
}

// ----------------------------gallery functionality--------------------
const gallery = document.querySelector('.card-gallery');
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
    Input.title.value,
    Input.author.value,
    Input.pages.value,
    currentDate
  );

  localStorage.setItem(`${localStorage.counter}`, JSON.stringify(newBook));

  Input.title.value = '';
  Input.author.value = '';
  Input.pages.value = '';

  updateGallery();
})

const cards = [];
const books = [];
function updateGallery() {
  while (gallery.lastElementChild) {
    gallery.removeChild(gallery.lastElementChild);
  }

  for(const property in localStorage) {
    if(/[0-9]/.test(property)) {
      cards.push(createCard(property, property));
    }
  }

  for(const property in localStorage) {
    if(/[0-9]/.test(property)) {
      books.push(JSON.parse(localStorage[property]));
    }
  }
    
  for(i = 0; i < cards.length; i++){
    const h2 = document.createElement('h2');
    h2.textContent = `${books[i].title}`;
    cards[i].appendChild(h2);

    const para1 = document.createElement('p');
    para1.textContent = `by ${books[i].author}`;
    cards[i].appendChild(para1);

    const para2 = document.createElement('p');
    para2.textContent = `${books[i].pages} pages`;
    cards[i].appendChild(para2);

    const para3 = document.createElement('p');
    para3.textContent = `${books[i]['date added']}`
    cards[i].appendChild(para3);

    const statusBtn = document.createElement('button');
    statusBtn.classList.add('status');
    cards[i].appendChild(statusBtn);

    if(h2.textContent.length > 20) {
      h2.style.fontSize = '20px';
    }

    console.log(books[i].title.length);
  }
}
