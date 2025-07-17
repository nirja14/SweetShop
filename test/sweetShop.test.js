const SweetShop = require('../src/sweetShop');

describe('Sweet Shop - Add Sweet', () => {
  test('should add a new sweet with name and quantity', () => {
    const shop = new SweetShop();

    shop.addSweet({
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    });

    const sweets = shop.getSweets();

    expect(sweets.length).toBe(1);
    expect(sweets[0].name).toBe('Kaju Katli');
    expect(sweets[0].category).toBe('Nut-Based');
    expect(sweets[0].price).toBe(50);
    expect(sweets[0].quantity).toBe(20);
  });
});

describe('Sweet Shop - Update Sweet', () => {
  test('should update the details of an existing sweet', () => {
    const shop = new SweetShop();

    shop.addSweet({
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    });

    const sweetToUpdate = shop.getSweets()[0];

    shop.updateSweet(sweetToUpdate.id, {
      name: 'Deluxe Kaju Katli',
      category: 'Premium Nut-Based',
      price: 75,
      quantity: 30
    });

    const updated = shop.getSweets()[0];
    expect(updated.name).toBe('Deluxe Kaju Katli');
    expect(updated.category).toBe('Premium Nut-Based');
    expect(updated.price).toBe(75);
    expect(updated.quantity).toBe(30);
  });

  test('should not update if sweet ID does not exist', () => {
    const shop = new SweetShop();

    const result = shop.updateSweet(9999, {
      name: 'Unknown Sweet'
    });

    expect(result).toBe(false); // or throw an error, depending on your choice
  });
});

describe('Sweet Shop - Delete Sweet', () => {
  test('should delete a sweet by ID', () => {
    const shop = new SweetShop();

    shop.addSweet({
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    });

    const sweet = shop.getSweets()[0];
    const deleteResult = shop.deleteSweet(sweet.id);
    const sweets = shop.getSweets();

    expect(deleteResult).toBe(true);
    expect(sweets.length).toBe(0);
  });

  test('should return false when deleting a non-existent sweet', () => {
    const shop = new SweetShop();

    const deleteResult = shop.deleteSweet(9999);
    expect(deleteResult).toBe(false);
  });
});

describe('Sweet Shop - Search Sweets', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });
  });

  test('should search sweets by name', () => {
    const result = shop.searchSweets({ name: 'Gulab Jamun' });
    expect(result.length).toBe(1);
    expect(result[0].category).toBe('Milk-Based');
  });

  test('should search sweets by category', () => {
    const result = shop.searchSweets({ category: 'Nut-Based' });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Kaju Katli');
  });

  test('should search sweets by price range', () => {
    const result = shop.searchSweets({ minPrice: 30, maxPrice: 45 });
    expect(result.length).toBe(2);
    expect(result.map(s => s.name)).toContain('Gulab Jamun');
    expect(result.map(s => s.name)).toContain('Gajar Halwa');
  });
});

describe('Sweet Shop - Sort Sweets', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 10 });
    shop.addSweet({ name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 15 });
  });

  test('should sort sweets by price ascending', () => {
    const result = shop.sortSweets('price', 'asc');
    expect(result[0].price).toBe(30);
    expect(result[2].price).toBe(50);
  });

  test('should sort sweets by price descending', () => {
    const result = shop.sortSweets('price', 'desc');
    expect(result[0].price).toBe(50);
    expect(result[2].price).toBe(30);
  });

  test('should sort sweets by category ascending (A-Z)', () => {
    const result = shop.sortSweets('category', 'asc');
    expect(result[0].category).toBe('Milk-Based');
    expect(result[2].category).toBe('Vegetable-Based');
  });

  test('should sort sweets by category descending (Z-A)', () => {
    const result = shop.sortSweets('category', 'desc');
    expect(result[0].category).toBe('Vegetable-Based');
    expect(result[2].category).toBe('Milk-Based');
  });
});

describe('Sweet Shop - View Sweets', () => {
  test('should return all sweets in the shop', () => {
    const shop = new SweetShop();

    shop.addSweet({ name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 10 });

    const sweets = shop.getSweets();

    expect(sweets.length).toBe(2);
    expect(sweets[0].name).toBe('Kaju Katli');
    expect(sweets[1].name).toBe('Gulab Jamun');
  });

  test('should return an empty list if no sweets are available', () => {
    const shop = new SweetShop();
    const sweets = shop.getSweets();
    expect(sweets.length).toBe(0);
  });
});
