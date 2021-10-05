import {APIGatewayProxyEvent} from 'aws-lambda';
import { LambdaResponse } from './Libs/LambdaResponse';
import { InsertProductCommand } from '../Application/Commands/InsertProductCommand';
import { InsertProductCommandHandler } from '../Application/CommandHandlers/InsertProductCommandHandler';
import { LambdaReturn } from './Libs/LambdaReturn';
import { getProductRepository } from './Libs/GetRepository';

export const productsApiPost = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    try {
        if (!event.body) 
            throw Error("Invalid body request: Null body");
    
        let inputData = JSON.parse(event.body);
        
        let command:InsertProductCommand = {
            description:inputData.description,
            price:inputData.price
        }

        console.log(command);
        
        let commandHandler = new InsertProductCommandHandler(getProductRepository(event.requestContext.stage),command);
        let commandResponse = await commandHandler.execute();

        return LambdaReturn.returnCreated({id: commandResponse.id, description: commandResponse.description, price: commandResponse.price});
        
    } catch(error:any) {
        console.log(error);
        return LambdaReturn.returnError(error);
    }   
};
