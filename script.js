const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnAdd = document.querySelector("#btn-add");

const displayIncomes = document.querySelector("#display-incomes");
const displayExpenses = document.querySelector("#display-expenses");
const displayTotal = document.querySelector("#display-total");

// Carrega dados ou inicia vazio
let items = JSON.parse(localStorage.getItem("db_items")) ?? [];

// Formata para R$ Real
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

btnAdd.onclick = () => {
  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  items.push({
    desc: descItem.value,
    amount: Math.abs(parseFloat(amount.value)).toFixed(2),
    type: type.value,
  });

  updateItens();

  descItem.value = "";
  amount.value = "";
};

function deleteItem(index) {
  if (confirm("Deseja realmente excluir esta transação?")) {
    items.splice(index, 1);
    updateItens();
  }
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.desc}</td>
    <td class="${item.type === "income" ? "incomes" : "expenses"}">
        ${formatCurrency(parseFloat(item.amount))}
    </td>
    <td class="columnType">${item.type === "income" ? "⬆" : "⬇"}</td>
    <td class="columnAction">
      <button onclick="deleteItem(${index})">Excluir</button>
    </td>
  `;
  tbody.appendChild(tr);
}

function updateItens() {
  localStorage.setItem("db_items", JSON.stringify(items));
  tbody.innerHTML = "";

  let income = 0;
  let expense = 0;

  items.forEach((item, index) => {
    insertItem(item, index);
    if (item.type === "income") {
      income += parseFloat(item.amount);
    } else {
      expense += parseFloat(item.amount);
    }
  });

  const total = income - expense;

  displayIncomes.innerHTML = formatCurrency(income);
  displayExpenses.innerHTML = formatCurrency(expense);
  displayTotal.innerHTML = formatCurrency(total);
}

// Inicia o sistema
updateItens();