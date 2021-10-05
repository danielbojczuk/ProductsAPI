import {APIGatewayProxyEvent} from 'aws-lambda';
import { LambdaResponse } from './Libs/LambdaResponse';
import { LambdaReturn } from './Libs/LambdaReturn';
import { DeleteProductCommand } from '../Application/Commands/DeleteProductCommand';
import { DeleteProductCommandHandler } from '../Application/CommandHandlers/DeleteProductCommandHandler';
import { BusinessError } from '../Helpers/Exceptions/BusinessError';
import { getProductRepository } from './Libs/GetRepository';

export const productsApiDelete = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    try {
        if(!event.pathParameters || !event.pathParameters.id)
            throw new BusinessError("Invalid Id");

        let command:DeleteProductCommand = {
            id: event.pathParameters.id
        }

        let commandHandler = new DeleteProductCommandHandler(getProductRepository(event.requestContext.stage), command)
        let commandReturn = await commandHandler.execute();

        if(!commandReturn)
            return LambdaReturn.returnNotFound();

        return LambdaReturn.returnOk();
        
    } catch(error:any) {
        console.log(error);
        return LambdaReturn.returnError(error);
    }   
};
