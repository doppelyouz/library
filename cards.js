const new_card = document.querySelector("#newCard");
const create_card = document.querySelector("#createCard");
const close_card = document.querySelector("#closeCard");
const inputs_create_cards_form = document.querySelector("#inputsCreateCards");
const tbody_cards = document.querySelector("#tbodyCards");
const search = document.querySelector("#cardSearchBy");
const sort = document.querySelector("#cardSortBy");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const returnBook = document.querySelector("#returnBook");
let books = JSON.parse(localStorage.getItem("books"));
let visitors = JSON.parse(localStorage.getItem("visitors"));

let chosenTr;
let thisId;

let localData = localStorage.getItem("cards");
let cardsArray = localData ? JSON.parse(localData) : [];

const tableCards = document.querySelector("#tableCards");

let forCards = 1;

tableCards.addEventListener("click", (event) => {
    thisId = event.target.getAttribute("data-id-return");
    chosenTr = event.target.closest("tr");
    console.log(thisId);
});
  
search.addEventListener("click", (e) => {
    e.preventDefault();
    let searchInput = document.querySelector("#searchInput");
    let table = document.querySelector("#tableCards");
    const btn = document.createElement("button");
    btn.textContent = "Убрать поиск";
    btn.classList.add("removeSearch");
    search.after(btn);
    search.setAttribute("disabled","disabled");
    let regPhrase = new RegExp(searchInput.value, 'i');
    let flag = false;
    for (let i = 1; i < table.rows.length; i++) {
        flag = false;
        for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].textContent);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
    btn.addEventListener("click", ()=>{
        search.removeAttribute("disabled");
        btn.remove();
        tbody_cards.innerHTML = "";
        cardsArray.forEach((el)=>{
                tbody_cards.innerHTML += `
                <tr>
                    <th>${el.id}</th>
                    <th>${el.visitor}</th>
                    <th>${el.book}</th>
                    <th>${el.borrow}</th>
                    <th>${el.return}</th>
                </tr>
                `;
        });
        searchInput.value = "";
    }); 
});

returnBook.addEventListener("click", () => {
    let now = Date.now();
    cardsArray.forEach(el => {
        if(Number(el.id) === Number(thisId)) {
            console.log(el.return);
            el.return = Intl.DateTimeFormat('ru').format(now);
            chosenTr.innerHTML = `
            <tr>
                <th>${el.id}</th>
                <th>${el.visitor}</th>
                <th>${el.book}</th>
                <th>${el.borrow}</th>
                <th>${el.return}</th>
            </tr>
            `;
            el.returnMilliseconds = now;
        }
    });
    localStorage.setItem("cards", JSON.stringify(cardsArray));
});

sort.addEventListener("click", ()=>{
    if(select.value == "id") {
        tbody_cards.innerHTML = "";
        cardsArray.forEach((el)=>{
                tbody_cards.innerHTML += `
                <tr>
                <th>${el.id}</th>
                <th>${el.visitor}</th>
                <th>${el.book}</th>
                <th>${el.borrow}</th>
                <th>${el.return}</th>
                </tr>
                `;
        });
    } else if(select.value == "borrow") {
        let cardsSortBorrow = [...cardsArray];
        tbody_cards.innerHTML = "";
        cardsSortBorrow.sort((a, b) => a.now > b.now ? -1 : 1);
        cardsSortBorrow.forEach((el)=>{
                tbody_cards.innerHTML += `
                <tr>
                <th>${el.id}</th>
                <th>${el.visitor}</th>
                <th>${el.book}</th>
                <th>${el.borrow}</th>
                <th>${el.return}</th>
                </tr>
                `;
        });
    } else if(select.value == "return") {
        let cardsSortReturn = [...cardsArray];
        tbody_cards.innerHTML = "";
        cardsSortReturn.sort((a, b) => a.returnMilliseconds > b.returnMilliseconds ? 1 : -1);
        cardsSortReturn.forEach((el)=> {
                tbody_cards.innerHTML += `
                <tr>
                    <th>${el.id}</th>
                    <th>${el.visitor}</th>
                    <th>${el.book}</th>
                    <th>${el.borrow}</th>
                    <th>${el.return}</th>
                </tr>
                `;
        });
    } 
});

function createTr(tr, index, value, attr) {
    let th = document.createElement("th");
    th.innerHTML = value;
    th.setAttribute(attr, index);
    tr.appendChild(th);
}
  
const drawRaw = (dataElement) => {
    let tr = document.createElement("tr");
    createTr(tr, forCards, dataElement.id, "data-id");
    createTr(tr, forCards, dataElement.visitor, "data-id-visitor");
    createTr(tr, forCards, dataElement.book, "data-id-book");
    createTr(tr, forCards, dataElement.borrow, "data-id-borrow");
    createTr(tr, forCards,dataElement.return,"data-id-return");
    tbody_cards.appendChild(tr);
    forCards++;
};
  
cardsArray.forEach((element) => {
    drawRaw(element);
});
  
new_card.addEventListener("click", () => {
    create_card.addEventListener("click", (e) => {
      e.preventDefault();
      let bookCheaker = false;
      let visitorCheaker = false;
      let visitor = document.querySelector("#visitor").value;
      let book = document.querySelector("#book").value;
      let now = new Date();
      books.some(e => { 
            if(e.title == book) {
                bookCheaker = true;
            }
      });
      visitors.some(e => { 
        if(e.name == visitor) {
            visitorCheaker = true;
        }
      });
      if(bookCheaker && visitorCheaker) {
        if (visitor && book) {
            const newCard = {
                id: Number(forCards),
                visitor: visitor,
                book: book,
                borrow: Intl.DateTimeFormat('ru').format(now),
                return: `<img src="return.png" data-bs-toggle="modal" data-bs-target="#returnCardModal" data-id-return=${Number(forCards)}>`,
                now: Date.now(),
                returnMilliseconds: Math.pow(10, 50)
            };
            cardsArray.push(newCard);
            drawRaw(newCard);
            localStorage.setItem("cards", JSON.stringify(cardsArray));
        }
        }
      inputs_create_cards_form.reset();
    });
    close_card.addEventListener("click", (e) => {
      e.preventDefault();
      inputs_create_cards_form.reset();
    });
  });