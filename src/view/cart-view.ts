import Builder from '../builder';
import MainPageView from './main-page-view';
import Cart from '../cart';
import CartElement from '../interfaces/cart-element';
import HeaderView from './header-view';

interface PromocodeParams {
  percent: number,
  text: string,
  isApplied: boolean,
}

class CartView {
  private static isPromoApplied = false;

  private static promocodes: { [key: string]: PromocodeParams } = {
    rss: {
      percent: 10,
      text: 'Rolling Scopes School',
      isApplied: false,
    },
    epam: {
      percent: 10,
      text: 'EPAM Systems',
      isApplied: false,
    }
  };

  static draw(): void {
    const cartPage: HTMLElement = Builder.createClone('cart-template');
    const storageCart: string | null = localStorage.getItem('cart');
    if (typeof storageCart === 'string') {
      if (storageCart === '[]') {
        cartPage.children[0].innerHTML = `<h1>Cart is Empty</h1>`;
      } else {
        CartView.fillProductsInfo(cartPage, storageCart);
        CartView.fillSummary(cartPage);
        CartView.setPromoInputHandler(cartPage);
        CartView.setPromoButtonsHandler(cartPage);
      }
    }

    const mainElement = document.querySelector('.main') as HTMLElement;
    if (mainElement.children.length) {
      mainElement.children[0].remove();
    }
    mainElement.append(cartPage);
    if (CartView.isPromoApplied) {
      CartView.renderAppliedCodes();
      CartView.handlePromoTotalSum();
    }
  }

  private static fillProductsInfo(
    cartPage: HTMLElement,
    cartInfo: string,
  ): void {
    const orderList = cartPage.querySelector('.order__list') as HTMLElement;
    const cartProducts = JSON.parse(cartInfo) as CartElement[];
    cartProducts.forEach((item, index) => {
      const orderItem = Builder.createClone('order-item-template');
      const orderedProduct = MainPageView.allProducts[item.id - 1];
      Builder.fillTextBlock(
        orderItem,
        '.order__number',
        (index + 1).toString(),
      );
      Builder.fillDataFields(orderItem, orderedProduct);
      Builder.fillTextBlock(
        orderItem,
        '.order__amount',
        item.amount.toString(),
      );
      Builder.fillTextBlock(
        orderItem,
        '.order__price span',
        Cart.getProductTotalPrice(orderedProduct).toString(),
        true,
      );

      const orderButtons = [
        ...orderItem.querySelectorAll('.order__button'),
      ] as HTMLElement[];
      orderButtons.forEach((button: HTMLElement) => {
        button.dataset.id = orderedProduct.id.toString();
      });
      orderList.append(orderItem);
    });
    CartView.setAmountButtonHandler(orderList);
  }

  private static fillSummary(parentsBlock: HTMLElement): void {
    Builder.fillTextBlock(
      parentsBlock,
      '.summary__products span',
      Cart.getTotalAmount().toString(),
    );
    Builder.fillTextBlock(
      parentsBlock,
      '.summary__total span',
      Cart.getCartSum().toString(),
      true,
    );
  }

  private static setAmountButtonHandler(orderList: HTMLElement): void {
    orderList.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLButtonElement) {
        const amountBlock = event.target.parentElement?.querySelector(
          '.order__amount',
        ) as HTMLElement;
        let previousAmount = Number(amountBlock.textContent);
        const productID = Number(event.target.dataset.id);
        const orderedProduct = MainPageView.allProducts[productID - 1];
        if (event.target.dataset.amount === 'decrease') {
          if (previousAmount === 1) {
            Cart.dropFromCart(orderedProduct);
            CartView.draw();
            previousAmount = 0;
          } else {
            Cart.decreaseAmount(orderedProduct);
            amountBlock.textContent = (previousAmount - 1).toString();
          }
        }
        if (event.target.dataset.amount === 'increase') {
          const maxAmount: number =
            MainPageView.allProducts[productID - 1].stock;
          if (previousAmount !== maxAmount) {
            Cart.increaseAmount(orderedProduct);
            amountBlock.textContent = (previousAmount + 1).toString();
          }
        }

        if (previousAmount !== 0) {
          const orderDigits = amountBlock.parentElement
            ?.parentElement as HTMLElement;
          Builder.fillTextBlock(
            orderDigits,
            '.order__price span',
            Cart.getProductTotalPrice(orderedProduct).toString(),
            true,
          );
        }

        const summaryBlock: Element | null = document.querySelector('.summary');
        if (summaryBlock instanceof HTMLElement) {
          CartView.fillSummary(summaryBlock);
          CartView.renderAppliedCodes();
          if (CartView.isPromoApplied) CartView.handlePromoTotalSum();
        }
        HeaderView.updateTotalCartDisplay();
      }
    });
  }

  private static setPromoInputHandler(parentBlock: HTMLElement): void {
    const input: Element | null = parentBlock.querySelector('.summary__input');
    if (input instanceof HTMLInputElement) {
      input.addEventListener('input', () => {
        const promoInfo = (input.parentElement as HTMLElement).querySelector('.summary__promo-info') as HTMLElement;
        if (input.value.length === 0) {
          if (!promoInfo.classList.contains('hidden'))
            promoInfo.classList.add('hidden');
        } else {
          const enteredValue = input.value.toLowerCase();
          if (Object.prototype.hasOwnProperty.call(CartView.promocodes, enteredValue)) {
            const addButton = promoInfo.querySelector('.summary__add') as HTMLElement;
            if (!CartView.promocodes[enteredValue].isApplied) {
              if (addButton.classList.contains('hidden')) addButton.classList.remove('hidden');
            }
            addButton.dataset.promo = enteredValue;
            promoInfo.classList.remove('hidden');
            Builder.fillTextBlock(
              promoInfo, 
              'b', 
              `${CartView.promocodes[enteredValue].text} - ${CartView.promocodes[enteredValue].percent}%`
            );
          }
        }
      })
    }
  }

  private static setPromoButtonsHandler(parentBlock: HTMLElement): void {
    const summary = parentBlock.querySelector('.summary') as HTMLElement;
    summary.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLButtonElement && !event.target.classList.contains('summary__button')) {
        const code = event.target.dataset.promo as string;
        if (event.target.classList.contains('summary__add')) CartView.setAddPromoHandler(event.target, code);
        if (event.target.classList.contains('summary__drop')) CartView.setDropPromoHandler(event.target, code);
      }
    })
  }

  private static setAddPromoHandler(button: HTMLButtonElement, code: string): void {
    CartView.isPromoApplied = true;
    CartView.promocodes[code].isApplied = true;
    CartView.renderAppliedCodes();
    button.classList.add('hidden');
    CartView.handlePromoTotalSum();
  }

  private static setDropPromoHandler(button: HTMLButtonElement, code: string): void {
    CartView.promocodes[code].isApplied = false;

    const codesList: Element | null = CartView.renderAppliedCodes();
    if (codesList instanceof Element) {
      if (codesList.children.length === 0) {
        (codesList.parentElement as HTMLElement).classList.add('hidden');
        CartView.isPromoApplied = false;
      } 
    }
    CartView.handlePromoTotalSum();
    
    const input: Element | null = document.querySelector('.summary__input') as HTMLElement;
    input.dispatchEvent(new Event('input'));
  }

  private static renderAppliedCodes(): Element | null {
    const appliedCodes: Element | null = document.querySelector('.summary__applied-codes');
    let codesList: HTMLElement | null = null;
    if (appliedCodes instanceof HTMLElement) {
      codesList = appliedCodes.querySelector('.summary__codes-list') as HTMLElement;
      codesList.innerHTML = '';
      if (CartView.isPromoApplied) {
        appliedCodes.classList.remove('hidden');
        Object.entries(CartView.promocodes).forEach((item) => {
          if (item[1].isApplied) {
            const appliedCode = Builder.createClone('applied-code-template');
            Builder.fillTextBlock(appliedCode, 'span', `${item[1].text} - ${item[1].percent}%`);
            const dropButton = appliedCode.querySelector('.summary__drop') as HTMLElement;
            const code = item[0];
            dropButton.dataset.promo = code;
            if (codesList instanceof HTMLElement) codesList.append(appliedCode); 
          }
        })
      } else {
        appliedCodes.classList.add('hidden');
      }
    }
    return codesList;
  }

  private static handlePromoTotalSum(): void {
    const totalPrice: Element | null = document.querySelector('.summary__total');
    let promoTotalPrice: Element | null = document.querySelector('.summary__total--promo');
    if (totalPrice instanceof HTMLElement) {
      if (promoTotalPrice instanceof Element) {
        if (!CartView.isPromoApplied) {
          promoTotalPrice.remove();
          totalPrice.classList.remove('summary__total--strike');
        } else {
          Builder.fillTextBlock(promoTotalPrice, 'span', `$${CartView.calculatePromoSum()}`);
        }
      } else {
        promoTotalPrice = totalPrice.cloneNode(true) as Element;
        totalPrice.parentElement?.insertBefore(promoTotalPrice, totalPrice.nextElementSibling);
        totalPrice.classList.add('summary__total--strike');
        promoTotalPrice.classList.add('summary__total--promo')
        Builder.fillTextBlock(promoTotalPrice, 'span', `$${CartView.calculatePromoSum()}`);
      }
    }
  }

  private static calculatePromoSum(): string {
    const promoPrecent: number = Object.values(CartView.promocodes).reduce((sum, item) => {
      let newSum = sum;
      if (item.isApplied) newSum += item.percent;
      return newSum;
    }, 0)
    return  (Cart.getCartSum() * (1 - promoPrecent * 0.01)).toFixed(0);
  }
}

export default CartView;
