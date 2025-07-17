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
