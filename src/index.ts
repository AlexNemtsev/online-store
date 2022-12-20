import DataLoader from './data-loader';

const getData = async () => {
  console.log(await DataLoader.fetchProductsData());
  console.log(5);
};

getData();
