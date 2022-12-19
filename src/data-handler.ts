type product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type responseData = {
  products: product[];
  total: number;
  skip: number;
  limit: number;
};

class DataLoader {
  errorHandler(res: Response): Response | never {
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

  fetchProductsData(): Promise<void | responseData> {
    return fetch('https://dummyjson.com/products?limit=100')
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data) => data as responseData)
      .catch((err) => console.error(err));
  }
}
