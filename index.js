let BOOKS = []
let NEW_BOOK = new Book("", "", "");

function Book(title, author, pages, isRead) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.ISBN = "";
    this.IsRead = isRead;
}

function IsValidBook(book) {
    return book.Title !== "" && book.Author !== "" && book.Pages !== "";
}

function RemoveBook(book) {
    // There is no Array.Remove()
    const index = BOOKS.indexOf(book);
    if (index > -1) { // only splice array when item is found
        BOOKS.splice(index, 1); // 2nd parameter means remove one item only
    }
    UpdateLibrary();
}

function AddBook(book) {
    BOOKS.push(book);
    UpdateLibrary();
}


AddBook(new Book("lotr 1", "jrr tolk", "a lot", true));
AddBook(new Book("lotr 2", "jrr tolk", "a lot", false));
AddBook(new Book("lotr 3", "jrr tolk", "a lot", true));
AddBook(new Book("lotr 4?", "jrr tolk", "a lot", false));

console.log(BOOKS);

RemoveBook(BOOKS[3]);

console.log(BOOKS);

function createBookElem(book) {
    var elem = document.createElement("div");
    // Book info
    const p = document.createElement("p");
    p.innerText = book.Title + " - " + book.Author + " - " + book.Pages;
    elem.appendChild(p);
    // Read checkbox
    const readCb = document.createElement("input");
    readCb.type = "checkbox";
    if (book.IsRead)
        readCb.checked = true;
    readCb.addEventListener("click", () => {
        book.IsRead = readCb.checked;
    });
    elem.appendChild(readCb);
    // Delete button
    const btn = document.createElement("button");
    btn.className = "material-symbols-outlined";
    btn.innerText = "delete";
    btn.addEventListener("click", () => {
        RemoveBook(book);
    });
    elem.appendChild(btn);
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
const form = document.querySelector("form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

// Form inputs
title.addEventListener("input", () => {
    NEW_BOOK.Title = title.value;
    console.log(NEW_BOOK);
    confirmBtn.disabled = !IsValidBook(NEW_BOOK);
})

author.addEventListener("input", () => {
    NEW_BOOK.Author = author.value;
    console.log(NEW_BOOK);
    confirmBtn.disabled = !IsValidBook(NEW_BOOK);
})

pages.addEventListener("input", () => {
    NEW_BOOK.Pages = pages.value;
    console.log(NEW_BOOK);
    confirmBtn.disabled = !IsValidBook(NEW_BOOK);
})

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
    NEW_BOOK = new Book("", "", "");
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
    confirmBtn.disabled = true;
});

// "Cancel" button closes the dialog without submitting
// because of [formmethod="dialog"], triggering a close event.
dialog.addEventListener("close", (event) => {
    event.preventDefault();
    dialog.close();
    // Do nothing here
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    // Prevent submit
    event.preventDefault();
    NEW_BOOK.IsRead = read.checked;
    console.log(NEW_BOOK);
    AddBook(NEW_BOOK);

    dialog.close(); // Have to send the select box value here.
});