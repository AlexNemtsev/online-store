import Product from './interfaces/product';

class DataHandler {
  private static getProperties(
    products: Product[],
    property: 'category' | 'brand',
  ): { [key: string]: number } {
    const properties: { [key: string]: number } = {};

    products.forEach((product) => {
      const prop: string = product[property];

      properties[prop] = properties[prop] ? properties[prop] + 1 : 1;
    });

    return properties;
  }

  private static getMin(
    products: Product[],
    property: 'price' | 'stock',
  ): number {
    return Math.min(...products.map((product) => product[property]));
  }

  private static getMax(
    products: Product[],
    property: 'price' | 'stock',
  ): number {
    return Math.max(...products.map((product) => product[property]));
  }

  static getCategories(products: Product[]): { [key: string]: number } {
    return DataHandler.getProperties(products, 'category');
  }

  static getBrands(products: Product[]): { [key: string]: number } {
    return DataHandler.getProperties(products, 'brand');
  }

  static getMinPrice(products: Product[]): number {
    return DataHandler.getMin(products, 'price');
  }

  static getMaxPrice(products: Product[]): number {
    return DataHandler.getMax(products, 'price');
  }

  static getMinStock(products: Product[]): number {
    return DataHandler.getMin(products, 'stock');
  }

  static getMaxStock(products: Product[]): number {
    return DataHandler.getMax(products, 'stock');
  }
}

export default DataHandler;
