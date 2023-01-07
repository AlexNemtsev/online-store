import Builder from '../builder';
import MainPageView from './main-page-view';
import Cart from '../cart';
import CartElement from '../interfaces/cart-element';

class CartView {
  static draw(): void {
    const cartPage: HTMLElement = Builder.createClone('cart-template');
    const storageCart: string | null = localStorage.getItem('cart');
    if (typeof storageCart === 'string') {
      if (storageCart === '[]') {
        cartPage.children[0].textContent = 'Cart is Empty';
      } else {
        CartView.fillProductsInfo(cartPage, storageCart);
        CartView.fillSummary(cartPage);
      }
    }

    const mainElement = document.querySelector('.main') as HTMLElement;
    if (mainElement.children.length) {
      mainElement.children[0].remove();
    }
    mainElement.append(cartPage);
  }

  private static fillProductsInfo(cartPage: HTMLElement, cartInfo: string): void {
    const orderList = cartPage.querySelector('.order__list') as HTMLElement;
    const cartProducts = JSON.parse(cartInfo) as CartElement[];
    cartProducts.forEach((item, index) => {
      const orderItem = Builder.createClone('order-item-template');
      const orderedProduct = MainPageView.allProducts[item.id - 1];
      Builder.fillTextBlock(orderItem, '.order__number', (index + 1).toString());
      Builder.fillDataFields(orderItem, orderedProduct);
      Builder.fillTextBlock(orderItem, '.order__amount', item.amount.toString());
      Builder.fillTextBlock(orderItem, '.order__price span', (Cart.getProductTotalPrice(orderedProduct)).toString(), true);

      const orderButtons = [...orderItem.querySelectorAll('.order__button')] as HTMLElement[];
      orderButtons.forEach((button: HTMLElement) => {
        button.dataset.id = orderedProduct.id.toString();
      })
      orderList.append(orderItem);
    })
    CartView.setAmountButtonHandler(orderList);
  }

  private static fillSummary(parentsBlock: HTMLElement): void {
    Builder.fillTextBlock(parentsBlock, '.summary__products span', Cart.getTotalAmount().toString());
    Builder.fillTextBlock(parentsBlock, '.summary__total span', Cart.getCartSum().toString(), true);
  }

  private static setAmountButtonHandler(orderList: HTMLElement): void {
    orderList.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLButtonElement) {
        const amountBlock = event.target.parentElement?.querySelector('.order__amount') as HTMLElement;
        let previousAmount = Number(amountBlock.textContent);
        const productID = Number(event.target.dataset.id);
        const orderedProduct = MainPageView.allProducts[productID - 1];
        if (event.target.dataset.amount === "decrease") {
          if (previousAmount === 1) {
            Cart.dropFromCart(orderedProduct);
            CartView.draw();
            previousAmount = 0;
          } else {
            Cart.decreaseAmount(orderedProduct);
            amountBlock.textContent = (previousAmount - 1).toString();
          }
        }
        if (event.target.dataset.amount === "increase") {
          const maxAmount: number = MainPageView.allProducts[productID - 1].stock;
          if (previousAmount !== maxAmount) {
            Cart.increaseAmount(orderedProduct);
            amountBlock.textContent = (previousAmount + 1).toString();
          }
        }
        
        if (previousAmount !== 0) {
          const orderDigits = amountBlock.parentElement?.parentElement as HTMLElement;
          Builder.fillTextBlock(
            orderDigits, 
            '.order__price span', 
            (Cart.getProductTotalPrice(orderedProduct)).toString(), 
            true
          );
        }

        const summaryBlock: Element | null = document.querySelector('.summary');
        if (summaryBlock instanceof HTMLElement) {
          CartView.fillSummary(summaryBlock);
        }
      }
    })
  }
}

export default CartView;
