import { Product } from '../src/Domain/Product'
import { validate as validateUuid } from 'uuid';
import { BusinessError } from '../src/Helpers/Exceptions/BusinessError'
test('Invalid Product Id', () => {
  const t = () => {
    new Product("Product 1",100,"id");
  };
  expect(t).toThrow(BusinessError);
});

test('Entity creation', () => {
  let description = "Product 1";
  let price = 100;
  let product = new Product(description,price);

  expect(product.getDescription()).toEqual(description);
  expect(product.getPrice()).toEqual(price);
  expect(validateUuid(product.getId())).toBeTruthy();
});