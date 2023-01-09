import addBtnHandler from '../add-btn-handler';
import Cart from '../cart';
import Product from '../interfaces/product';
import PageNotFoundView from './page-not-found-view';

class ProductPageView {
  private static fillTextElements(
    elementsArray: Element[],
    valuesArray: Array<string | number>,
  ): void {
    for (let i = 0; i < elementsArray.length; i += 1) {
      elementsArray[i].textContent = `${valuesArray[i]}`;
    }
  }

  private static setImageClickHandler(
    imagesList: Element,
    mainImage: HTMLImageElement,
  ): void {
    imagesList.addEventListener('click', (event: Event): void => {
      if (event.target instanceof HTMLImageElement) {
        if (mainImage.src !== event.target.src) {
          mainImage.src = event.target.getAttribute('src') as string;
        }
      }
    });
  }

  private static fillImages(
    parentElement: Element,
    imagesListTag: string,
    mainImageTag: string,
    item: Product,
  ): void {
    const productImagesList = parentElement.querySelector(
      imagesListTag,
    ) as Element;
    const productMainImage = parentElement.querySelector(
      mainImageTag,
    ) as HTMLImageElement;
    [productImagesList.children[0], productMainImage].forEach(
      (image: Element) => {
        image.setAttribute('src', item.images[0]);
        image.setAttribute('alt', item.title);
      },
    );

    if (item.images.length > 1) {
      for (let i = item.id === 1 ? 3 : 1; i < item.images.length; i += 1) {
        const newImage = productImagesList.children[0].cloneNode(
          true,
        ) as Element;
        newImage.setAttribute('src', item.images[i]);
        productImagesList.append(newImage);
      }
    }

    ProductPageView.setImageClickHandler(productImagesList, productMainImage);
  }

  static fillPageTemplate(item: Product): void {
    if (!item) PageNotFoundView.draw();
    else {
      const template = document.getElementById(
        'product-page-template',
      ) as HTMLTemplateElement;
      const productPage = template.content.cloneNode(true) as HTMLElement;

      const breadcrumbs: Element[] = [
        ...productPage.querySelectorAll('.breadcrumbs__item'),
      ].slice(1);
      const productTitle = productPage.querySelector(
        '.product__title',
      ) as Element;
      const productProps: Element[] = [
        ...productPage.querySelectorAll('.product__property span'),
      ];
      const productPrice = productPage.querySelector(
        '.product__price span',
      ) as Element;
      ProductPageView.fillTextElements(
        [...breadcrumbs, productTitle, ...productProps, productPrice],
        [
          item.category,
          item.brand,
          item.title,
          item.title,
          item.description,
          item.category,
          item.brand,
          item.rating,
          item.stock,
          item.discountPercentage,
          item.price,
        ],
      );

      ProductPageView.fillImages(
        productPage,
        '.product__images-list',
        '.product__image--main',
        item,
      );

      const mainElement = document.querySelector('.main') as HTMLElement;

      if (mainElement.children.length) {
        mainElement.children[0].remove();
      }

      mainElement.append(productPage);

      const addToCartBtn = mainElement.querySelector(
        '.add-to-cart-btn',
      ) as HTMLButtonElement;

      if (Cart.isProductInCart(item)) addToCartBtn.textContent = 'Drop';

      addBtnHandler(addToCartBtn, item);
    }
  }
}

export default ProductPageView;
