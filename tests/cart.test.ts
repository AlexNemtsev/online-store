import { beforeEach, describe, expect, it } from '@jest/globals';
import Cart from '../src/cart';
import CartElement from '../src/interfaces/cart-element';
import Product from '../src/interfaces/product';
import LocalStorageMock from './mocks/local-storage-mock';

beforeEach(async () => (globalThis.localStorage = new LocalStorageMock()));

describe('When add a product to cart', () => {
  it('should contain added product', () => {
    const item: Product = {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      ],
    };

    Cart.addToCart(item);
    const expected: CartElement[] = [
      { id: item.id, amount: 1, price: item.price },
    ];

    expect(Cart.cart).toEqual(expected);
  });
});
