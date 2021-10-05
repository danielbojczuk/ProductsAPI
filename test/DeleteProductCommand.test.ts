import { DeleteProductCommandHandler } from '../src/Application/CommandHandlers/DeleteProductCommandHandler'
import { DeleteProductCommand } from '../src/Application/Commands/DeleteProductCommand'
import { BusinessError } from '../src/Helpers/Exceptions/BusinessError'
import { ProductRepository } from './MockClasses/ProductRepository'


it('Delete invalid ID', async () => {

  let command:DeleteProductCommand ={
    id: "Invalid ID"
  }

  let commandHandler = new DeleteProductCommandHandler(new ProductRepository(),command);

  await expect( commandHandler.execute()).rejects.toThrow(BusinessError);
});

it('Delete non-existing ID', async () => {

  let command:DeleteProductCommand ={
    id: "f63221bd-91e9-4958-ad9f-d254b091c4bf"
  }

  let commandHandler = new DeleteProductCommandHandler(new ProductRepository(),command);
  let commandResult = await commandHandler.execute();

  expect(commandResult).toBeFalsy();
});
