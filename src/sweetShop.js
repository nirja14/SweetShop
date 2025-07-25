class SweetShop {
  constructor() {
    this.sweets = [];
    this.nextId = 1001;
  }

  addSweet({ name, category, price, quantity }) {
    const sweet = {
      id: this.nextId++,
      name,
      category,
      price,
      quantity
    };
    this.sweets.push(sweet);
  }

  getSweets() {
    return this.sweets;
  }
  updateSweet(id, updatedData) {
  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) return false;

  if (updatedData.name) sweet.name = updatedData.name;
  if (updatedData.category) sweet.category = updatedData.category;
  if (updatedData.price !== undefined) sweet.price = updatedData.price;
  if (updatedData.quantity !== undefined) sweet.quantity = updatedData.quantity;

  return true;
}
deleteSweet(id) {
  const index = this.sweets.findIndex(s => s.id === id);
  if (index === -1) return false;
  this.sweets.splice(index, 1);
  return true;
}

searchSweets({ name, category, minPrice, maxPrice }) {
  return this.sweets.filter(sweet => {
    const matchName = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchCategory = category ? sweet.category.toLowerCase().includes(category.toLowerCase()) : true;
    const matchMinPrice = minPrice !== undefined ? sweet.price >= minPrice : true;
    const matchMaxPrice = maxPrice !== undefined ? sweet.price <= maxPrice : true;

    return matchName && matchCategory && matchMinPrice && matchMaxPrice;
  });
}
sortSweets(field, order = 'asc') {
  const validFields = ['price', 'category'];
  if (!validFields.includes(field)) return [...this.sweets]; // return unsorted copy

  const sorted = [...this.sweets].sort((a, b) => {
    if (typeof a[field] === 'string') {
      return order === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    } else {
      return order === 'asc'
        ? a[field] - b[field]
        : b[field] - a[field];
    }
  });

  return sorted;
}

purchaseSweet(id, quantity) {
  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) throw new Error('Sweet not found.');

  if (sweet.quantity < quantity) {
    throw new Error('Not enough stock to complete purchase.');
  }

  sweet.quantity -= quantity;
}

restockSweet(id, quantity) {
  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) throw new Error('Sweet not found.');
  if (quantity <= 0) throw new Error('Invalid restock quantity.');

  sweet.quantity += quantity;
}

}

module.exports = SweetShop;
