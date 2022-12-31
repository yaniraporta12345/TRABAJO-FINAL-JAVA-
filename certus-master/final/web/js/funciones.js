let el, i;
let data = [
  { firstname: "Maria", lastname: "Sevilla" }
];
let panel = document.querySelector("#panel");
let nombreDeUsuario = document.querySelector("#nombreDeUsuario");

  function renderItem() {
  
    panel.textContent = "";

    data.forEach(x => {
      el = document.createElement("option");
      el.innerText = `${x.firstname} ${x.lastname}`;
      panel.append(el);
    });
  }
  
  function panelClick() {
    i = panel.selectedIndex;
    document.querySelector("#fname").value = data[0].firstname;
    document.querySelector("#lname").value = data[0].lastname;
  }
  
  function update() {
    data[0].firstname = document.querySelector("#fname").value;
    data[0].lastname = document.querySelector("#lname").value;
    renderItem();
  }
  
  function deleteItem() {
    data.splice(i, 1);
    renderItem();
    window.location.href = "login.html";
  }

  function editarClick() {
    document.querySelector("#fname").value = data[0].firstname;
    document.querySelector("#lname").value = data[0].lastname;
  }
  
   renderItem();