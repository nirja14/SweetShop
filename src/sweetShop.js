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
}

module.exports = SweetShop;
