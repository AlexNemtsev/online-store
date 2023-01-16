import CartElement from '../../src/interfaces/cart-element';
import { items } from './products';

const cartElements: CartElement[] = items.map((item) => {
  return {
    id: item.id,
    amount: 1,
    price: item.price,
  };
});

export default cartElements;
