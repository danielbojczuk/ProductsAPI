import { Product } from '../src/Domain/Product'
import { validate as validateUuid } from 'uuid';
import { BusinessError } from '../src/Helpers/Exceptions/BusinessError'

describe('Product Entity validation', function() {
  it('Invalid  Id', () => {
    const t = () => {
      new Product("Product 1",100,"id");
    };
    expect(t).toThrow(BusinessError);
  });

  it('Creation', () => {
    let description = "Product 1";
    let price = 100;
    let product = new Product(description,price);

    expect(product.getDescription()).toEqual(description);
    expect(product.getPrice()).toEqual(price);
    expect(validateUuid(product.getId())).toBeTruthy();
  });
});