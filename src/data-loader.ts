import product from "./interfaces/product";

type responseData = {
  products: product[];
  total: number;
  skip: number;
  limit: number;
};

class DataLoader {
  private static errorHandler(res: Response): Response | never {
    if (res.ok) return res;
    else {
      if (res.status === 401 || res.status === 404) {
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`,
        );
      }
      throw Error(res.statusText);
    }
  }

  static fetchProductsData(): Promise<void | product[]> {
    return fetch('https://dummyjson.com/products?limit=100')
      .then((res) => DataLoader.errorHandler(res))
      .then((res) => res.json())
      .then((data) => (data as responseData).products)
      .catch((err) => console.error(err));
  }
}

export default DataLoader;
