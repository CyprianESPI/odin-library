let BOOKS = []

function Book(title, author, pages) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.ISBN = "";
    this.IsRead = false;
}

function RemoveBook(book) {
    // There is no Array.Remove()
    // Filter method to create a new array without the element
    BOOKS = BOOKS.filter(item => item !== book)
}

function AddBook(book) {
    BOOKS.push(book);
}


AddBook(new Book("lotr 1", "jrr tolk", "a lot"));
AddBook(new Book("lotr 2", "jrr tolk", "a lot"));
AddBook(new Book("lotr 3", "jrr tolk", "a lot"));
AddBook(new Book("lotr 4?", "jrr tolk", "a lot"));

console.log(BOOKS);

RemoveBook(BOOKS[3]);

console.log(BOOKS);

function createBookElem(book) {
    var elem = document.createElement("p");
    elem.innerText = book.Title + " - " + book.Author + " - " + book.Pages;
    return elem;
}

function UpdateLibrary() {
    const library = document.getElementById("library");

    // Remove previous content
    while (library.firstChild) {
        library.firstChild.remove()
    }

    // Fill the library
    for (let index = 0; index < BOOKS.length; index++) {
        library.appendChild(createBookElem(BOOKS[index]));
    }

}

UpdateLibrary();