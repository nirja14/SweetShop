let allSweets = []; // global list for sorting/search

const tableBody = document.querySelector('#sweetTable tbody');
const form = document.getElementById('addForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const sweet = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    quantity: parseInt(document.getElementById('quantity').value)
  };

  await fetch('/api/sweets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sweet)
  });

  alert('Sweet added successfully!');
  form.reset();
  loadSweets();
});

async function loadSweets() {
  const res = await fetch('/api/sweets');
  allSweets = await res.json();
  renderSweets(allSweets);
}

function renderSweets(sweets) {
  tableBody.innerHTML = '';

  sweets.forEach(sweet => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sweet.id}</td>
      <td><input value="${sweet.name}" id="name-${sweet.id}" /></td>
      <td><input value="${sweet.category}" id="category-${sweet.id}" /></td>
      <td><input type="number" value="${sweet.price}" id="price-${sweet.id}" /></td>
      <td><input type="number" value="${sweet.quantity}" id="quantity-${sweet.id}" /></td>
      <td>
        <button onclick="purchase(${sweet.id})">Purchase</button>
        <button onclick="restock(${sweet.id})">Restock</button>
        <button onclick="updateSweet(${sweet.id})">Update</button>
        <button onclick="deleteSweet(${sweet.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

async function deleteSweet(id) {
  await fetch(`/api/sweets/${id}`, { method: 'DELETE' });
  alert('Sweet deleted successfully!');
  loadSweets();
}

async function purchase(id) {
  const input = prompt("Enter quantity to purchase:");

  if (input === null || input.trim() === "") {
    alert("Quantity is required.");
    return;
  }

  const qty = parseInt(input.trim());

  if (isNaN(qty) || qty <= 0) {
    alert("Invalid quantity.");
    return;
  }

  try {
    const res = await fetch(`/api/sweets/${id}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Purchase failed.");
    }

    alert('Sweet purchased!');
    loadSweets();

  } catch (err) {
    alert(`❌ ${err.message}`);
  }
}

async function restock(id) {
  const input = prompt("Enter quantity to restock:");

  if (input === null || input.trim() === "") {
    alert("Quantity is required.");
    return;
  }

  const qty = parseInt(input.trim());

  if (isNaN(qty) || qty <= 0) {
    alert("Invalid quantity.");
    return;
  }

  try {
    await fetch(`/api/sweets/${id}/restock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    });
    alert('Sweet restocked!');
    loadSweets();
  } catch {
    alert("Restock error");
  }
}

async function updateSweet(id) {
  const name = document.getElementById(`name-${id}`).value;
  const category = document.getElementById(`category-${id}`).value;
  const price = parseFloat(document.getElementById(`price-${id}`).value);
  const quantity = parseInt(document.getElementById(`quantity-${id}`).value);

  if (!name || !category || isNaN(price) || isNaN(quantity)) {
    alert("Invalid input.");
    return;
  }

  await fetch(`/api/sweets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category, price, quantity })
  })
    .then(() => {
      alert("Sweet updated successfully!");
      loadSweets();
    })
    .catch(() => alert("Update failed."));
}

async function searchSweets() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) return;

  const filtered = allSweets.filter(sweet =>
    sweet.name.toLowerCase().includes(query) ||
    sweet.category.toLowerCase().includes(query) ||
    sweet.price.toString().includes(query) ||
    sweet.quantity.toString().includes(query)
  );

  renderSweets(filtered);
}

function handleSort() {
  const value = document.getElementById('sortSelect').value;
  let field = value;
  let direction = 1;

  if (value.endsWith('-desc')) {
    field = value.replace('-desc', '');
    direction = -1;
  }

  const sorted = [...allSweets].sort((a, b) => {
    if (typeof a[field] === 'string') {
      return a[field].localeCompare(b[field]) * direction;
    } else {
      return (a[field] - b[field]) * direction;
    }
  });

  renderSweets(sorted);
}

loadSweets();
