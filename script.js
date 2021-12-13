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

  displayBooks();
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
    main.append(card);

    createDeleteBtn(book, card);
    displayInfo(book, card);
    createStatusBtn(book, card);
  }
  
  function displayInfo(book, card) {
    const titleTxt = document.createElement('h1');
    titleTxt.textContent = book.title;
    card.append(titleTxt);
    
    const authorTxt = document.createElement('p');
    authorTxt.textContent = book.author;
    card.append(authorTxt);
    
    const pageTxt = document.createElement('p');
    pageTxt.textContent = book.pages;
    card.append(pageTxt);
    
    const dateTxt = document.createElement('p');
    dateTxt.textContent = book.date;
    card.append(dateTxt);
  }
  
  // ------------------------- CARDS -------------------------

  function createDeleteBtn(book, card) {
    const deleteBtn = document.createElement('button');
    deleteBtn.id = ('delete');
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
    card.append(deleteBtn);

    deleteBtn.addEventListener('click', () => {
      result = confirm('Are you sure you want to delete this book?')
      if(result) {
        bookList.splice(bookList.indexOf(book), 1);
        localStorage.setItem('books', JSON.stringify(bookList));
        displayBooks();
      }
    })
  }

  function createStatusBtn(book, card) {
    const statusBtn = document.createElement('button');
    statusBtn.id = 'status'
    card.append(statusBtn)
    
    statusBtn.addEventListener('click', () => {
      console.log(book.finishedReading);
      if(book.finishedReading == false) {
        book.finishedReading = true;
        statusBtn.textContent = 'UNREAD';
      } else if(book.finishedReading == true) {
        book.finishedReading = false;
        statusBtn.textContent = 'READ';
      }
    })
  }
  