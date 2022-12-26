import product from '../interfaces/product';

class ProductPageView {
  private fillTextElements(
    elementsArray: Element[],
    valuesArray: Array<string | number>,
  ): void {
    elementsArray.forEach((item: Element, index: number): void => {
      item.textContent = `${valuesArray[index]}`;
    });
  }

  private setImageClickHandler(
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

  private fillImages(
    parentElement: Element,
    imagesListTag: string,
    mainImageTag: string,
    item: product,
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
      for (let i = 1; i < item.images.length; i += 1) {
        const newImage = productImagesList.children[0].cloneNode(
          true,
        ) as Element;
        newImage.setAttribute('src', item.images[i]);
        productImagesList.append(newImage);
      }
    }

    this.setImageClickHandler(productImagesList, productMainImage);
  }

  fillPageTemplate(item: product): HTMLElement {
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
    this.fillTextElements(
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

    this.fillImages(
      productPage,
      '.product__images-list',
      '.product__image--main',
      item,
    );

    return productPage;
  }
}

export default ProductPageView;
