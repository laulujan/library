let myLibrary = [];

//book constructor
function Book(id, title, author, pages, read){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let faust = new Book(1, "Faust", "Goethe", 158, "yes");
myLibrary.push(faust);

function getRadioValue(){
    const radios = document.getElementsByName('status');
    if(radios[0].checked){
        return 'yes';
    }else{
        return 'no'
    }
}

// function to add onclick function to add button
document.getElementById('add').addEventListener('click', addBookToLibrary)
//get form info and create new book, then adds it to library
function addBookToLibrary(id, title, author, pages, read){
    id = myLibrary.length;
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    read = getRadioValue();

    let newBook = new Book(id, title, author, pages, status);
    myLibrary.push(newBook);
}

