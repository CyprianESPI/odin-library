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

/* Main - fill up library + test removal */
AddBook(new Book("The Fellowship of the Ring", "J. R. R. Tolkien", "423", true));
AddBook(new Book("The Two Towers", "J. R. R. Tolkien", "352", false));
AddBook(new Book("The Return of the King", "J. R. R. Tolkien", "416 ", false));
AddBook(new Book("lotr 4?", "jrr tolk", "a lot", false));
console.log(BOOKS);

RemoveBook(BOOKS[3]);
console.log(BOOKS);

function createBookElem(book) {
    var elem = document.createElement("div");
    elem.className = "book";

    // Read checkbox
    const h2 = document.createElement("h2");
    if (book.IsRead)
        h2.innerText = "📖";
    else
        h2.innerText = "📘";
    const readCb = document.createElement("input");
    readCb.type = "checkbox";
    if (book.IsRead)
        readCb.checked = true;
    readCb.addEventListener("click", () => {
        book.IsRead = readCb.checked;
        UpdateLibrary();
    });
    h2.appendChild(readCb)
    elem.appendChild(h2);
    // Book info
    const h3 = document.createElement("h2");
    h3.innerText = book.Title;
    elem.appendChild(h3);
    const h4 = document.createElement("h3");
    h4.innerText = "by " + book.Author;
    elem.appendChild(h4);
    const h5 = document.createElement("h4");
    h5.innerText = book.Pages + " pages";
    elem.appendChild(h5);

    // Delete button
    const btn = document.createElement("button");
    btn.className = "material-symbols-outlined";
    btn.innerText = "delete";
    btn.addEventListener("click", () => {
        RemoveBook(book);
    });
    // https://stackoverflow.com/questions/6632340/place-a-button-right-aligned
    btn.style.float = "right";
    elem.appendChild(btn);
    return elem;
}

function UpdateLibrary() {
    const library = document.getElementById("library");

    // Remove previous content
    document.getElementById("books").innerText = "";
    while (library.firstChild) {
        library.firstChild.remove()
    }

    // Fill the library
    for (let index = 0; index < BOOKS.length; index++) {
        library.appendChild(createBookElem(BOOKS[index]));
        // Update books count
        if (BOOKS[index].IsRead)
            document.getElementById("books").innerText += "📖";
        else
            document.getElementById("books").innerText += "📘";
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