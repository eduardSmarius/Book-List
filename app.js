// Constructors
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() { }

UI.prototype.addBook = function (book) {
    const tr = document.createElement('tr');
    tr.innerHTML = ` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="remove" href="#">X</a></td>`

    document.querySelector('.t-body').appendChild(tr);
}

UI.prototype.clearFields = function (title, author, isbn) {
    document.querySelector(".form-control[name='title']").value = '';
    document.querySelector(".form-control[name='author']").value = '';
    document.querySelector(".form-control[name='isbn']").value = '';
}

UI.prototype.showMessage = function (message, type) {

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


// Event Listeners
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
    }

    e.preventDefault();
})


document.querySelector('.container').addEventListener('click', function (e) {
    const ui = new UI();


    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        ui.showMessage('Book removed!', 'success');
    }
})