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
