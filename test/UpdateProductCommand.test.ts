import { UpdateProductCommandHandler } from '../src/Application/CommandHandlers/UpdateProductCommandHandler'
import { UpdateProductCommand } from '../src/Application/Commands/UpdateProductCommand'
import { BusinessError } from '../src/Helpers/Exceptions/BusinessError'
import { ProductRepository } from './MockClasses/ProductRepository'


describe('UpdateProductCommandHandler', function() {
  it('Invalid ID', async () => {

    let command:UpdateProductCommand ={
      id: "Invalid ID",
      description: "Product description",
      price: 2
    }

    let commandHandler = new UpdateProductCommandHandler(new ProductRepository(),command);

    await expect( commandHandler.execute()).rejects.toThrow(BusinessError);
  });

  it('Non-existing ID', async () => {

    let command:UpdateProductCommand ={
      id: "f63221bd-91e9-4958-ad9f-d254b091c4bf",
      description: "Product description",
      price: 2
    }

    let commandHandler = new UpdateProductCommandHandler(new ProductRepository(),command);
    let commandResult = await commandHandler.execute();

    expect(commandResult).toBeFalsy();
  });
});
