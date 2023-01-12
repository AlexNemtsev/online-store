import { describe, expect, it, test } from '@jest/globals';
import Cart from '../src/cart';
import CartElement from '../src/interfaces/cart-element';

describe('When add a product to cart', () => {
  it('should contain added product', () => {
    Cart.addToCart();
    const expected: CartElement[] = [
      { id: 0, amount: 1, price: 456 },
    ].toString();
  });
});
