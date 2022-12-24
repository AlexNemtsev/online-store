import product from "./interfaces/product";

class DataHandler {
  private static getProperties(products: product[], property: 'category' | 'brand'): {[key: string]: number} {
    const properties: {[key: string]: number} = {};

    products.forEach((product) => {
      const prop: string = product[property];

      properties[prop] = properties[prop] ? properties[prop] + 1: 1
    });

    return properties;
  }

  private static getMin(products: product[], property: 'price' | 'stock'): number {
    return Math.min(...products.map((product) => product[property]));
  }

  private static getMax(products: product[], property: 'price' | 'stock'): number {
    return Math.max(...products.map((product) => product[property]));
  }

  static getCategories(products: product[]): {[key: string]: number} {
    return DataHandler.getProperties(products, 'category');
  }

  static getBrands(products: product[]): {[key: string]: number} {
    return DataHandler.getProperties(products, 'brand');
  }

  static getMinPrice(products: product[]): number {
    return DataHandler.getMin(products, 'price');
  }

  static getMaxPrice(products: product[]): number {
    return DataHandler.getMax(products, 'price');
  }

  static getMinStock(products: product[]): number {
    return DataHandler.getMin(products, 'stock');
  }

  static getMaxStock(products: product[]): number {
    return DataHandler.getMax(products, 'stock');
  }
}

export default DataHandler;