import Product from './interfaces/product';

type CartElement = {
  id: number;
  amount: number;
  price: number;
};

class Cart {
  private static cart: CartElement[];

  private static findId(product: Product): number {
    return Cart.cart.findIndex((el) => el.id === product.id);
  }

  public static addToCart(product: Product): void {
    Cart.cart.push({
      id: product.id,
      amount: 1,
      price: product.price,
    });
  }

  public static dropFromCart(product: Product): void {
    Cart.cart.splice(Cart.findId(product), 1);
  }

  public static increaseAmount(product: Product): void {
    const id: number = Cart.findId(product);
  }

  public static decreaseAmount(product: Product): void {}

  public static getSum(): void {}

  public static getTotalAmount(): void {}

  private static saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(Cart.cart));
  }

  private static loadCart(): void {
    Cart.cart = (JSON.parse('cart') as CartElement[]) ?? [];
  }
}

export default Cart;
