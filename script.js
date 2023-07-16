// Dom references
const bookCard = document.querySelector("template").content.cloneNode(true);
const libraryContainer = document.querySelector('.library');
const addBookButton = document.querySelector('.addBookButton')
const addBookForm = document.querySelector('.addBookForm');
const cancelBookFormButton = document.querySelector('.cancelBookFormButton');
const bookForm = document.querySelector('#bookForm');

//Event listeners
addBookButton.addEventListener('click', function()
{
    openAddBookForm()
});
bookForm.addEventListener('submit', function(e)
{
    e.preventDefault()
    bookFormSubmit();
    bookForm.reset();
    return false;
});
cancelBookFormButton.addEventListener('click', function()
{
    closeAddBookForm();
});

// Constructor function that will create new book
function Book(author, title, pages, haveRead)
{
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.haveRead = haveRead;
}

// Main data structure that will hold all the books in the library
let myLibrary = 
[
    new Book("John Doe", "Where is doe?", "111", false),
    new Book("Jane Doe", "Doe is here?", "222", true),
    new Book("Cat doe", "Meow meow?", "333", false)
];

// This function is
function setup()
{
    addBookForm.classList.add('hide');
    displayLibrary(myLibrary);
}

//This function handles what happens when we submit the add book form.
//We go ahead and grab all the input from the user and convert it to book object.
//Then we go ahead and add it to the library.
function bookFormSubmit()
{
    let newTitle = document.querySelector("#bTitle").value;
    let newAuthor = document.querySelector("#bAuthor").value;
    let newPages = document.querySelector("#bPages").value;
    let newHaveRead = document.querySelector("#bHaveRead").checked;

    console.log(newHaveRead);

    addBookToLibrary(new Book(newAuthor, newTitle, newPages, newHaveRead));
    closeAddBookForm();
}

// Function that will add a new book to the library
function addBookToLibrary(book)
{
    myLibrary.push(book);
    addBookToDisplay(book);
}

// This function allows us to remove a book from the library
function removeBookFromLibrary(book)
{
    let bookIndex = myLibrary.indexOf(book);
    myLibrary.splice(bookIndex, 1);
    libraryContainer.children[bookIndex].remove();
}

function addBookToDisplay(book)
{
    // Make an new clone of the bookCard and add it to the library element.
    libraryContainer.appendChild(bookCard.cloneNode(true));
    //We go ahead and grab the last child of the library element
    // which should be the new clone we just added above.
    let newBookCard = document.querySelector('.library').lastElementChild;

    // Time to manipulate and update the book card with the correct Book info.
    newBookCard.querySelector('.bookTitle > .titleText').textContent = book.title;
    newBookCard.querySelector('.bookAuthor > .authorText').textContent = book.author;
    newBookCard.querySelector('.bookPages > .pagesText').textContent = book.pages;
    newBookCard.querySelector('#haveRead').checked = book.haveRead;

    //We make sure to addEventListener for the new book remove button
    let newRemoveButton = newBookCard.querySelector('.removeBookButton');
    newRemoveButton.addEventListener('click', function(e)
    {
        removeBookFromLibrary(book);
    });

    // We make sure to addEventListener to the have read checkbox as well
    // to allow the user to check and uncheck it.
    let newCheckBox = newBookCard.querySelector('#haveRead');
    newCheckBox.addEventListener('click', function(e)
    {
        haveReadStateChanged(book);
    });
}

// This function displays all the books in the library
function displayLibrary(myLibrary)
{

    //Loop through each book in the library array and display it
    if(Array.isArray(myLibrary))
    {
        myLibrary.forEach(book => 
        {
            addBookToDisplay(book, myLibrary.indexOf(book));
        });
    }
    else
    {
        console.log("Not an library of type Array");
    }
}

// Updates the book haveRead state whenever the user changes the haveRead checkbox on the book
function haveReadStateChanged(book)
{
    if(book.haveRead === true)
    {
        book.haveRead = false;
    }
    else
    {
        book.haveRead = true;
    }
}

// This function allows the form to open and show to the user.
function openAddBookForm()
{
    addBookForm.classList.remove('hide');
}

// This function closes the form so the user cannot see it anymore.
function closeAddBookForm()
{
    addBookForm.classList.add('hide');
}


setup();