let cardsArray = JSON.parse(localStorage.getItem("cards"));
let resultVisitors = {};
for (let i = 0; i < cardsArray.length; ++i)
{
    let a = cardsArray[i].visitor;
    if (resultVisitors[a] != undefined)
        ++resultVisitors[a];
    else
    resultVisitors[a] = 1;
}
for (let key in resultVisitors) {
    console.log(key + ' == ' + resultVisitors[key]);
}
console.log("");
let resultBooks = {};
for (let i = 0; i < cardsArray.length; ++i)
{
    let a = cardsArray[i].book;
    if (resultBooks[a] != undefined)
        ++resultBooks[a];
    else
    resultBooks[a] = 1;
}
for (let key in resultBooks) {
    console.log(key + ' == ' + resultBooks[key]);
}


let sortableVisitors = [];
for (let visitor in resultVisitors) {
    sortableVisitors.push([visitor, resultVisitors[visitor]]);
}
sortableVisitors.sort(function(a, b) {
    return b[1] - a[1];
});

let sortableBooks = [];
for (let book in resultBooks) {
    sortableBooks.push([book, resultBooks[book]]);
}
sortableBooks.sort(function(a, b) {
    return b[1] - a[1];
});

sortableBooks = sortableBooks.slice(0, 5);
sortableVisitors = sortableVisitors.slice(0, 5);
console.log(sortableVisitors);
console.log(sortableBooks);

let forDrawBook = 0;
let forDrawVisitor = 0;

function createTr(tr, value) {
    let th = document.createElement("th");
    th.textContent = value;
    tr.appendChild(th);
}
  
const drawRawBook = (dataElement) => {
    let tr = document.createElement("tr");
    createTr(tr, sortableBooks[forDrawBook][0]);
    createTr(tr, sortableBooks[forDrawBook][1]);
    document.querySelector("#tbodyPopularBooks").appendChild(tr);
    forDrawBook++;
};
  
const drawRawVisitor = (dataElement) => {
    let tr = document.createElement("tr");
    createTr(tr, sortableVisitors[forDrawVisitor][0]);
    createTr(tr, sortableVisitors[forDrawVisitor][1]);
    document.querySelector("#tbodyActiveVisitors").appendChild(tr);
    forDrawVisitor++;
};

sortableBooks.forEach((element) => {
    drawRawBook(element);
});
sortableVisitors.forEach((element) => {
    drawRawVisitor(element);
});