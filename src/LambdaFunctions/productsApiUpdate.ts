import {APIGatewayProxyEvent} from 'aws-lambda';
import { LambdaResponse } from './Libs/LambdaResponse';
import { LambdaReturn } from './Libs/LambdaReturn';
import { BusinessError } from '../Helpers/Exceptions/BusinessError';
import { UpdateProductCommandHandler } from '../Application/CommandHandlers/UpdateProductCommandHandler';
import { UpdateProductCommand } from '../Application/Commands/UpdateProductCommand';
import { getProductRepository } from './Libs/GetRepository';

export const productsApiUpdate = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    try {
        if(!event.pathParameters || !event.pathParameters.id)
            throw new BusinessError("Invalid Id");
        
        if (!event.body) 
            throw Error("Invalid body request: Null body");    

        let inputData = JSON.parse(event.body);    

        let command:UpdateProductCommand = {
            id: event.pathParameters.id,
            description: inputData.description,
            price: inputData.price
        }

        let commandHandler = new UpdateProductCommandHandler(getProductRepository(event.requestContext.stage), command)
        let commandReturn = await commandHandler.execute();

        if(!commandReturn)
            return LambdaReturn.returnNotFound();

        return LambdaReturn.returnOk();
        
    } catch(error:any) {
        console.log(error);
        return LambdaReturn.returnError(error);
    }   
};
