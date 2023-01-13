import Product from './interfaces/product';
import CartElement from './interfaces/cart-element';

class Cart {
  private static _cart: CartElement[] = [];

  private static findIndex(product: Product): number {
    return Cart._cart.findIndex((el) => el.id === product.id);
  }

  public static addToCart(product: Product): void {
    Cart._cart.push({
      id: product.id,
      amount: 1,
      price: product.price,
    });

    Cart.saveCart();
  }

  public static dropFromCart(product: Product): void {
    if (Cart.findIndex(product) !== -1)
      Cart._cart.splice(Cart.findIndex(product), 1);

    Cart.saveCart();
  }

  public static increaseAmount(product: Product): void {
    const idx: number = Cart.findIndex(product);
    Cart._cart[idx].amount += 1;

    Cart.saveCart();
  }

  public static decreaseAmount(product: Product): void {
    const idx: number = Cart.findIndex(product);
    Cart._cart[idx].amount -= 1;

    Cart.saveCart();
  }

  public static isProductInCart(product: Product): boolean {
    return Cart.findIndex(product) !== -1;
  }

  public static getCartSum(): number {
    let sum = 0;
    Cart._cart.forEach((el) => {
      sum += el.amount * el.price;
    });

    return sum;
  }

  public static getTotalAmount(): number {
    let amount = 0;
    Cart._cart.forEach((el) => {
      amount += el.amount;
    });

    return amount;
  }

  private static saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(Cart._cart));
  }

  public static loadCart(): void {
    const cartFromStorage = localStorage.getItem('cart') ?? '[]';
    Cart._cart = JSON.parse(cartFromStorage) as CartElement[];
  }

  public static getProductTotalPrice(product: Product): number {
    const idx: number = Cart.findIndex(product);
    const totalPrice = Cart._cart[idx].amount * Cart._cart[idx].price;

    return totalPrice;
  }

  public static dropCart(): void {
    Cart._cart = [];
    Cart.saveCart();
  }

  public static get cart() {
    return Cart._cart;
  }
}

export default Cart;
