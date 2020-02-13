// Classes
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {

    addBook(book) {
        const tr = document.createElement('tr');
        tr.innerHTML = ` 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class="remove" href="#">X</a></td>`

        document.querySelector('.t-body').appendChild(tr);
    }

    clearFields(title, author, isbn) {
        document.querySelector(".form-control[name='title']").value = '';
        document.querySelector(".form-control[name='author']").value = '';
        document.querySelector(".form-control[name='isbn']").value = '';
    }

    showMessage(message, type) {

        const container = document.querySelector('.container');
        const div = document.createElement('div');
        div.textContent = message;
        div.classList.add(type);
        const form = document.querySelector('#book-list');
        container.insertBefore(div, form);

        setTimeout(function () {
            div.remove();
        }, 3000)

    }
}


class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addToLS(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static paintUI() {
        let books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();
            ui.addBook(book);
        })
    }

    static removeFromLS(isbn) {
        let books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event Listeners
document.addEventListener('DOMContentLoaded', Store.paintUI())

document.querySelector('#book-list').addEventListener('submit', function (e) {

    const title = document.querySelector(".form-control[name='title']").value;
    const author = document.querySelector(".form-control[name='author']").value;
    const isbn = document.querySelector(".form-control[name='isbn']").value;

    const book = new Book(title, author, isbn);
    const ui = new UI()

    if (title === '' || author === '' || isbn === '') {
        ui.showMessage('Please complete all fields!', 'danger');
    } else {
        ui.addBook(book);
        ui.clearFields(title, author, isbn);
        ui.showMessage('Book added!', 'success');
        Store.addToLS(book);
    }

    e.preventDefault();
})


document.querySelector('.container').addEventListener('click', function (e) {
    const ui = new UI();

    if (e.target.classList.contains('remove')) {
        Store.removeFromLS(e.target.parentElement.previousElementSibling.textContent)
        e.target.parentElement.parentElement.remove();
        ui.showMessage('Book removed!', 'success');

    }
})