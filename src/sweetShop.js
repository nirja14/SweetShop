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

}

module.exports = SweetShop;
