import Builder from '../builder';
import MainPageView from './main-page-view';
import CartElement from '../interfaces/cart-element';

class CartView {
  static draw(): void {
    const cartPage: HTMLElement = Builder.createClone('cart-template');
    const orderList = cartPage.querySelector('.order__list') as HTMLElement;

    const storageCart: string | null = localStorage.getItem('cart');
    if (typeof storageCart === 'string') {
      const cartProducts: CartElement[] = JSON.parse(storageCart);
      cartProducts.forEach((item, index) => {
        const orderItem = Builder.createClone('order-item-template');
        const orderedProduct = MainPageView.allProducts[item.id - 1];
        Builder.fillTextBlock(orderItem, '.order__number', (index + 1).toString())
        Builder.fillDataFields(orderItem, orderedProduct);
        Builder.fillTextBlock(orderItem, '.order__amount', item.amount.toString())
        orderList.append(orderItem);
      })
    }

    const mainElement = document.querySelector('.main') as HTMLElement;
    if (mainElement.children.length) {
      mainElement.children[0].remove();
    }
    mainElement.append(cartPage);
  }
}

export default CartView;
