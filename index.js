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
    const index = BOOKS.indexOf(book);
    if (index > -1) { // only splice array when item is found
        BOOKS.splice(index, 1); // 2nd parameter means remove one item only
    }
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

const showButton = document.getElementById("dialogShow");
const confirmBtn = document.getElementById("dialogConfirm");
const dialog = document.querySelector("dialog");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Cancel" button closes the dialog without submitting
// because of [formmethod="dialog"], triggering a close event.
dialog.addEventListener("close", () => {
    //dialog.close();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    console.log(event);
    dialog.close(); // Have to send the select box value here.

});