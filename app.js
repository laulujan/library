let myLibrary = [];

//book constructor
function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


//function to load info from local storage
window.addEventListener('load', () => {
    myLibrary = JSON.parse(localStorage.getItem('library')) || [];
    myLibrary.forEach(book => {
        displayCards(book);
    });
})


let addBook = document.getElementById('add-book');
addBook.addEventListener('click', showForm)
//function to remove class hidden from book form
function showForm(){
    document.getElementsByClassName('book-form')[0].classList.remove('hidden');
    addBook.classList.add('hidden');

}
//function to add class hidden to book form
function hideForm(){
    document.getElementsByClassName('book-form')[0].classList.add('hidden');
    addBook.classList.remove('hidden');
}



function getRadioValue() {
  const radios = document.getElementsByName("status");
  if (radios[0].checked) {
    return true;
  } else {
    return false;
  }
}

// function to add onclick function to add button
document.getElementById("add").addEventListener("click", addBookToLibrary);
//get form info and create new book, then adds it to library
function addBookToLibrary(id, title, author, pages, read) {
  id = myLibrary.length;
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = document.getElementById("pages").value;
  read = getRadioValue();
  if(title == "" || author == "" || pages == ""){
    alert ('Please enter valid info')
}

  let newBook = new Book(id, title, author, pages, read);
  myLibrary.push(newBook);
  hideForm();
  displayCards(newBook);
  localStorage.setItem('library', JSON.stringify(myLibrary));

}

//books is the area where the cards are going to be placed
let books = document.getElementById("booksCtn");

//function to create elements
function createElem(elem){
    return document.createElement(elem)
}
//create book card and display
function displayCards(newBook) {
  let card = createElem("div");
  card.classList.add('card')
  card.setAttribute("id", newBook.id)
  let bookTtl = createElem("h3");
  bookTtl.innerHTML = newBook.title;
  bookTtl.classList.add('book-title')
  let bookAuthor = createElem("h4");
  bookAuthor.innerHTML = newBook.author;
  bookAuthor.classList.add('book-author')
  let subDiv = createElem("div");
  subDiv.classList.add('sub');
  let bookPages = createElem("p");
  bookPages.textContent = "Pages: " + newBook.pages;
  let lab = createElem("label");
  lab.classList.add('switch');
  let statusInput = createElem("input");
  statusInput.type = "checkbox";
  statusInput.checked = newBook.read;
  statusInput.addEventListener('change', changeStatus)
  let spn = createElem("span");
  spn.classList.add('slider');
  spn.classList.add('round');
  let readStatus = createElem("p");
  readStatus.innerHTML = "Read";
  let remove = createElem("button");
  remove.textContent = "Remove";
  remove.classList.add("remove");
  remove.addEventListener('click', removeCard)
  lab.appendChild(statusInput);
  lab.appendChild(spn);
  subDiv.appendChild(bookPages);
  subDiv.appendChild(readStatus);
  subDiv.appendChild(lab);
  card.appendChild(bookTtl);
  card.appendChild(bookAuthor);
  card.appendChild(subDiv);
  card.appendChild(remove);
  books.appendChild(card);

  //this function is used to change the read status of the book and is called on toggle input
function changeStatus (statusInput){
    if(statusInput.checked){
        return newBook.read = true;
    }else{
        return newBook.read = false;
    }
}

//this function removes the book's card and removes the book from array
function removeCard(){
    document.getElementById(newBook.id).remove();
    let index = myLibrary.findIndex(element => element.id == newBook.id);
    myLibrary.splice(newBook.id, 1);
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

}


