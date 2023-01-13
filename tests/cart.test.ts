import { beforeEach, describe, expect, it } from '@jest/globals';
import Cart from '../src/cart';
import CartElement from '../src/interfaces/cart-element';
import items from './test-data/products';
import cartElements from './test-data/cart-elements';
import LocalStorageMock from './mocks/local-storage-mock';

beforeEach(async () => (globalThis.localStorage = new LocalStorageMock()));

describe('When add products to cart', () => {
  it('should contain added products', () => {
    items.forEach((item) => Cart.addToCart(item))
    const expected: CartElement[] = cartElements;

    expect(Cart.cart).toEqual(expected);
  });
});
