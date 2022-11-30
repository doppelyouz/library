const new_visitor = document.querySelector("#newVisitor");
const create_visitor = document.querySelector("#createVisitor");
const close_visitor = document.querySelector("#closeVisitor");
const inputs_create_visitors_form = document.querySelector("#inputsCreateVisitors");
const tbody_visitors = document.querySelector("#tbodyVisitors");
const inputs_edit_visitors_form = document.querySelector("#inputsChangeVisitors");
const search = document.querySelector("#visitorSearchBy");
const sort = document.querySelector("#visitorSortBy");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");

let chosenTr;
let thisId;

let localData = localStorage.getItem("visitors"); // Чтобы избежать ошибки, лучше проверить, есть ли такой ключ в localStorage
let visitorsArray = localData ? JSON.parse(localData) : [];
let forVisitors;
if(JSON.parse(localData)) {
  forVisitors = Number(visitorsArray[visitorsArray.length - 1].id) + 1;
} else {
  forVisitors = 1;
}
const save_edit_visitor = document.querySelector("#saveChangesVisitor");
const closeChangeBook = document.querySelector("#closeChangesVisitor");

const nameChange = document.querySelector("#nameChange");
const phoneChange = document.querySelector("#phoneChange");


const tableVisitor = document.querySelector("#tableVisitor");

tableVisitor.addEventListener("click", (event) => {
  thisId = event.target.getAttribute("data-id");
  chosenTr = event.target.closest("tr");

  const thisVisitor = visitorsArray.find((elem) => Number(elem.id) === Number(thisId));

  console.log(thisId);
  nameChange.value = thisVisitor.name;
  phoneChange.value = thisVisitor.phone;
});


sort.addEventListener("click", ()=>{
    console.log(select.value);
    if(select.value == "id") {
        tbody_visitors.innerHTML = "";
        visitorsArray.forEach((el)=>{
            tbody_visitors.innerHTML += `
            <tr>
              <th>${el.id}</th>
              <th>${el.name}</th>
              <th>${el.phone}</th>
              <th><img src="edit.png" data-id=${el.id} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
            </tr>
            `;
        });
    } else if(select.value == "name") {
        let visitorsSortName = [...visitorsArray];
        console.log(visitorsSortName);
        visitorsSortName.sort((a, b) => a.name > b.name ? 1 : -1);
        tbody_visitors.innerHTML = "";
        visitorsSortName.forEach((el)=>{
            tbody_visitors.innerHTML += `
            <tr>
              <th>${el.id}</th>
              <th>${el.name}</th>
              <th>${el.phone}</th>
              <th><img src="edit.png" data-id=${el.id} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
            </tr>
            `;
        });
    }
});

search.addEventListener("click", (e) => {
    e.preventDefault();
    let searchInput = document.querySelector("#searchInput");
    let table = document.querySelector("#tableVisitor");
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
            console.log(flag);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
    console.log(visitorsArray);
    btn.addEventListener("click", ()=>{
        console.log("new btn");
        search.removeAttribute("disabled");
        btn.remove();
        let index = 1;
        tbody_visitors.innerHTML = "";
        visitorsArray.forEach((el)=>{
            tbody_visitors.innerHTML += `
            <tr>
              <th>${index}</th>
              <th>${el.name}</th>
              <th>${el.phone}</th>
              <th><img src="edit.png" data-id=${index} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
            </tr>
            `;
            index++;
        });
        searchInput.value = "";
    }); 
});

save_edit_visitor.addEventListener("click", () => {
    const newVisitor= {
      id: thisId,
      name: nameChange.value,
      phone: phoneChange.value,
    };
  
    visitorsArray = visitorsArray.map((elem) =>
      Number(elem.id) === Number(newVisitor.id) ? newVisitor : elem
    );
  
    chosenTr.innerHTML = `
    <tr>
      <th>${newVisitor.id}</th>
      <th>${newVisitor.name}</th>
      <th>${newVisitor.phone}</th>
      <th><img src="edit.png" data-id=${thisId} data-bs-toggle="modal" data-bs-target="#changeVisitorModal"></th>
    </tr>
    `;
    
    localStorage.setItem("visitors", JSON.stringify(visitorsArray));
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
    th.innerHTML = `<img src="edit.png" data-id="${dataElement.id}" data-bs-toggle="modal" data-bs-target="#changeVisitorModal">`;
    tr.appendChild(th);
    tbody_visitors.appendChild(tr);
  };
  
visitorsArray.forEach((element) => {
    drawRaw(element);
});

new_visitor.addEventListener("click", () => {
    create_visitor.addEventListener("click", (e) => {
      e.preventDefault();
      let name = document.querySelector("#name").value;
      let phone = document.querySelector("#phone").value;
      if (name && phone) {
        const newVisitor = {
          id: Number(forVisitors),
          name:name,
          phone:phone
        };
        visitorsArray.push(newVisitor);
        localStorage.setItem("visitors", JSON.stringify(visitorsArray));
        drawRaw(newVisitor);
        forVisitors++;
      }
      inputs_create_visitors_form.reset();
    });
    close_visitor.addEventListener("click", (e) => {
      e.preventDefault();
      inputs_create_visitors_form.reset();
    });
  });