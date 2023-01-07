import Product from './interfaces/product';
import FiltersObject from './interfaces/filters';

class SearchHandler {
  
  public static handleSearch(filters: FiltersObject, products: Product[]): Product[] {
    const foundProducts: Product[] = [];
    const searchInput: Element | null = document.querySelector('.search');
    const searchQuery: string = filters.search[0].toString();
    if (searchInput instanceof HTMLInputElement) {
      searchInput.value = searchQuery;
      searchInput.focus();
    }
    
    products.forEach((product: Product) => {
      const productForSearch: [string, string | number | string[]][] = Object.entries(product);
      for (let i = 0; i < productForSearch.length; i += 1) {
        if (!['id', 'thumbnail', 'images'].includes(productForSearch[i][0])) {
          if (productForSearch[i][1].toString().toLowerCase().search(searchQuery.toLowerCase()) > -1) {
            foundProducts.push(product);
            break;
          }
        }
      }
    })
    return foundProducts;
  }
}

export default SearchHandler;
