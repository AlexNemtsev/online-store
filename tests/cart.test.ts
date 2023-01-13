import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
} from '@jest/globals';
import Cart from '../src/cart';
import CartElement from '../src/interfaces/cart-element';
import { items, absentItem } from './test-data/products';
import cartElements from './test-data/cart-elements';
import LocalStorageMock from './mocks/local-storage-mock';

const idxOfItem = 0;

beforeEach(async () => {
  globalThis.localStorage = new LocalStorageMock();
  items.forEach((item) => Cart.addToCart(item));
});

afterEach(() => Cart.dropCart());

describe('When cart is dropped', () => {
  it('should be empty', () => {
    Cart.dropCart();

    expect(Cart.cart).toEqual([]);
  });
});

describe('When add products to cart', () => {
  it('should contain added products', () => {
    const expected: CartElement[] = cartElements;

    expect(Cart.cart).toEqual(expected);
  });

  it('should find existing product in the cart', () => {
    const actual = Cart.isProductInCart(items[idxOfItem]);

    expect(actual).toBe(true);
  });

  it("shouldn't find absent product in the cart", () => {
    const actual = Cart.isProductInCart(absentItem);

    expect(actual).toBe(false);
  });
});

describe('When an item dropped from the cart', () => {
  it("shouldn't be found in the cart", () => {
    Cart.dropFromCart(items[idxOfItem]);

    const actual = Cart.isProductInCart(items[idxOfItem]);

    expect(actual).toBe(false);
  });
});

describe('When called Cart.increaseAmount', () => {
  it('should increase amount of specified item in the cart', () => {
    Cart.increaseAmount(items[idxOfItem]);

    const actual = Cart.cart[idxOfItem].amount;
    const expected = 2;

    expect(actual).toEqual(expected);
  });
});

describe('When called Cart.decreaseAmount', () => {
  it('should decrease amount of specified item in the cart', () => {
    Cart.decreaseAmount(items[idxOfItem]);

    const actual = Cart.cart[idxOfItem].amount;
    const expected = 0;

    expect(actual).toEqual(expected);
  });
});

test('Cart.getCartSum should return sum of cart', () => {
  const actual = Cart.getCartSum();
  const expected = cartElements.reduce(
    (acc, el) => el.price * el.amount + acc,
    0,
  );

  expect(actual).toBe(expected);
});

test('Cart.getTotalAmount should return total amount of items in cart', () => {
  const actual = Cart.getTotalAmount();
  const expected = cartElements.reduce((acc, el) => el.amount + acc, 0);

  expect(actual).toBe(expected);
});
