import product from './interfaces/product';
import GridView from './view/grid-view';

type SortKey = 'price' | 'rating' | 'discountPercentage';

class SortHandler {
  products: product[];

  constructor(products: product[]) {
    this.products = products;
    this.setHandlers();
  }

  private handleSort(option: string): product[] {
    const sortedProducts: product[] = [...this.products];
    const [parameter, direction] = option.split('-') as [SortKey, string];
    sortedProducts.sort((a, b) => {
      if (direction === 'ASC') {
        return Number(a[parameter]) - Number(b[parameter]);
      } 
      return Number(b[parameter]) - Number(a[parameter]);
    })
    return sortedProducts;
  }

  private setHandlers(): void {
    const sortSelect = document.querySelector('.sort') as HTMLSelectElement;
    sortSelect.addEventListener('change', () => {
      const selectedOption = sortSelect.options[sortSelect.selectedIndex].value;
      const sortedProducts = this.handleSort(selectedOption);
      GridView.draw(sortedProducts);
    });
  }
}

export default SortHandler;
