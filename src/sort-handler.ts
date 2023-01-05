import Product from './interfaces/product';
import FiltersObject from './interfaces/filters';

type SortKey = 'price' | 'rating' | 'discountPercentage';

class SortHandler {
  
  public static handleSort(filters: FiltersObject, products: Product[]): Product[] {
    const sortedProducts: Product[] = [...products];
    const sortSelect: Element | null = document.querySelector('.sort');
    const option: string = filters.sort[0].toString();
    if (sortSelect instanceof HTMLSelectElement) sortSelect.value = option;

    const [parameter, direction] = option.split('-') as [SortKey, string];
    sortedProducts.sort((a, b) => {
      if (direction === 'ASC') {
        return Number(a[parameter]) - Number(b[parameter]);
      } 
      return Number(b[parameter]) - Number(a[parameter]);
    })
    return sortedProducts;
  }
}

export default SortHandler;
