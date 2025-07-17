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

}

module.exports = SweetShop;
