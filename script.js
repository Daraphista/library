let bookList = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
localStorage.setItem('books', JSON.stringify(bookList));
let darkMode = localStorage.getItem('darkMode') ? JSON.parse(localStorage.getItem('darkMode')) : false;
localStorage.setItem('darkMode', darkMode);

window.addEventListener('load', () => {
  displayBooks();
  
  if(darkMode == true) {
    toggleDarkMode();
  }
})

// ------------------------- MENU -------------------------

const menuBtn = document.getElementById('menu');
const addBtn = document.getElementById('add');
const themeBtn = document.getElementById('theme');

menuBtn.addEventListener('click', () => {
  toggleMenu();
  if(!document.querySelector('form').classList.contains('hidden')) {
    togglePopupForm();
  }
  adjustMenuPosition();
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
    const form = document.querySelector('form');
    const btns = document.querySelector('.buttons');

    form.classList.toggle('hidden');
    if(window.matchMedia("(hover: none)").matches) {
      btns.style.display = (!form.classList.contains('hidden')) ? 'none' : 'flex';
      form.style.margin = "0em";
      form.style.width = "100%";
    }
  }

themeBtn.addEventListener('click', () => {
  console.log(darkMode);
  if(darkMode === false) {
    localStorage.setItem('darkMode', true);
    console.log(localStorage);
  } else if(darkMode == true) {
    localStorage.setItem('darkMode', false);
  }
  toggleDarkMode();
  toggleMenu();
});

  function toggleDarkMode() {
    document.querySelector('body').classList.toggle('dark');
    document.querySelector('.banner').classList.toggle('dark');
    document.querySelector('.main').classList.toggle('dark');
    document.querySelector('.footer').classList.toggle('dark');
    document.querySelector('.card').classList.toggle('dark');
    document.getElementById('delete').classList.toggle('dark');
    const form = document.querySelector('form').classList.toggle('dark');
    const buttons = document.querySelector('.buttons');
    buttons.querySelectorAll('button').forEach(button => button.classList.toggle('dark'));
  }

  function adjustMenuPosition() {
    const bottomOfWindow = window.scrollY + window.innerHeight;
    const footerPosition = document.querySelector('.footer').offsetTop;
    const menuBtns = document.querySelector('.buttons');
    const menu = document.querySelector('.menu');

    if(bottomOfWindow > footerPosition) {
      menuBtns.style.bottom = `${bottomOfWindow - footerPosition + 20}px`;
    } else if(menu.classList.contains('blurred')) {
      console.log('lmao');
      menuBtns.style.bottom = `1px`; 
    }
  }

window.addEventListener('scroll', () => {
  adjustMenuPosition();
})

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

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';

  displayBooks();
})

const main = document.querySelector('.main');

  function displayBooks() {
    while(main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }

    bookList.forEach(book => {
      createCard(book, bookList);
    })
  }

  function createCard(book, bookList) {
    const card = document.createElement('div');
    card.classList.add('card');
    main.append(card);

    createDeleteBtn(book, card);
    displayInfo(book, card);
    createStatusBtn(book, card, bookList);
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

  function createStatusBtn(book, card, bookList) {
    const statusBtn = document.createElement('button');
    statusBtn.id = 'status'
    if(book.finishedReading == false) {
      statusBtn.textContent = 'UNREAD';
    } else if(book.finishedReading == true) {
      statusBtn.textContent = 'FINISHED';
    }
    card.append(statusBtn)
    
    statusBtn.addEventListener('click', () => {
      console.log(book.finishedReading);
      if(book.finishedReading == false) {
        book.finishedReading = true;
        statusBtn.textContent = 'UNREAD';
      } else if(book.finishedReading == true) {
        book.finishedReading = false;
        statusBtn.textContent = 'FINISHED';
      }
      localStorage.setItem('books', JSON.stringify(bookList));
      displayBooks();
    })
  }
  