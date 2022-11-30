const new_book = document.querySelector("#newBook");
const create_book = document.querySelector("#createBook");
const close_book = document.querySelector("#closeBook");
const inputs_create_form = document.querySelector("#inputsCreateBooks");
const save_edit_book = document.querySelector("#saveChangesBook");
const tbody_books = document.querySelector("#tbodyBooks");
const inputs_edit_form = document.querySelector("#inputsChangeBooks");

let chosenTr;
let thisId;

let localData = localStorage.getItem("books"); 
let booksArray = localData ? JSON.parse(localData) : [];
let forBooks;
if(JSON.parse(localData)) {
  forBooks = Number(booksArray[booksArray.length - 1].id) + 1;
} else {
  forBooks = 1;
}

const saveChangesBook = document.querySelector("#saveChangesBook");
const closeChangeBook = document.querySelector("#closeChangeBook");
const deleteBook = document.querySelector("#deleteBook");

const titleChange = document.querySelector("#titleChange");
const authorChange = document.querySelector("#authorChange");
const publishingYearChange = document.querySelector("#publishingYearChange");
const publisherNameChange = document.querySelector("#publisherNameChange");
const pagesChange = document.querySelector("#pagesChange");
const countChange = document.querySelector("#countChange");

const tableBook = document.querySelector("#tableBook");

tableBook.addEventListener("click", (event) => {
  thisId = event.target.getAttribute("data-id");
  chosenTr = event.target.closest("tr");

  const thisBook = booksArray.find(
    (elem) => Number(elem.id) === Number(thisId)
  );

  titleChange.value = thisBook.title;
  authorChange.value = thisBook.author;
  publishingYearChange.value = thisBook.publishingYear;
  publisherNameChange.value = thisBook.publisherName;
  pagesChange.value = thisBook.pages;
  countChange.value = thisBook.count;
});

saveChangesBook.addEventListener("click", () => {
  const newBook = {
    id: thisId,
    title: titleChange.value,
    author: authorChange.value,
    publishingYear: publishingYearChange.value,
    publisherName: publisherNameChange.value,
    pages: pagesChange.value,
    count: countChange.value,
  };

  booksArray = booksArray.map((elem) =>
    Number(elem.id) === Number(newBook.id) ? newBook : elem
  );

  chosenTr.innerHTML = `
  <tr>
    <th>${newBook.id}</th>
    <th>${newBook.title}</th>
    <th>${newBook.author}</th>
    <th>${newBook.publishingYear}</th>
    <th>${newBook.publisherName}</th>
    <th>${newBook.pages}</th>
    <th>${newBook.count}</th>
    <th><img src="edit.png" data-id=${thisId} data-bs-toggle="modal" data-bs-target="#exampleModal"></th>
    <th><img src="delete.png" data-id=${thisId} data-bs-toggle="modal" data-bs-target="#exampleModalDelete"></th>
  </tr>
  `;
  localStorage.setItem("books", JSON.stringify(booksArray));
});

deleteBook.addEventListener("click", () => {
  booksArray = booksArray.filter((elem) => {
    if (Number(elem.id) !== Number(thisId)) {
      return elem;
    }
  });
  localStorage.setItem("books", JSON.stringify(booksArray));
  chosenTr.innerHTML = "";
});

function createTr(tr, index, value, attr) {
  let th = document.createElement("th");
  th.innerHTML = value;
  th.setAttribute(attr, index);
  tr.appendChild(th);
}

const drawRaw = (dataElement) => {
  let tr = document.createElement("tr");
  for (let key in dataElement) {
    if (key === "id") {
      createTr(tr, dataElement.id, dataElement.id, "data-id");
    } else {
      createTr(tr, dataElement.id, dataElement[key], `data-id-${key}`);
    }
  }
  let th = document.createElement("th");
  th.innerHTML = `<img src="edit.png" data-id="${dataElement.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">`;
  tr.appendChild(th);
  th = document.createElement("th");
  th.innerHTML = `<img src="delete.png" data-id="${dataElement.id}" data-bs-toggle="modal" data-bs-target="#exampleModalDelete">`;
  tr.appendChild(th);
  tbody_books.appendChild(tr);
};

booksArray.forEach((element) => {
  drawRaw(element);
});

new_book.addEventListener("click", () => {
  create_book.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let publishingYear = document.querySelector("#publishingYear").value;
    let publisherName = document.querySelector("#publisherName").value;
    let pages = document.querySelector("#pages").value;
    let count = document.querySelector("#count").value;
    if (!count) count = 1;
    if (title && author && publishingYear && publisherName && pages) {
      const newBook = {
        id: Number(forBooks),
        title: title,
        author: author,
        publishingYear: publishingYear,
        publisherName: publisherName,
        pages: pages,
        count: count,
      };
      booksArray.push(newBook);
      localStorage.setItem("books", JSON.stringify(booksArray));
      drawRaw(newBook);
      forBooks++;
    }
    inputs_create_form.reset();
  });
  close_book.addEventListener("click", (e) => {
    e.preventDefault();
    inputs_create_form.reset();
  });
});
