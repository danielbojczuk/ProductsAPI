import {APIGatewayProxyEvent} from 'aws-lambda';
import { LambdaResponse } from './Libs/LambdaResponse';
import { LambdaReturn } from './Libs/LambdaReturn';
import { BusinessError } from '../Helpers/Exceptions/BusinessError';
import { validate as validateUuid } from 'uuid';
import { getProductRepository } from './Libs/GetRepository';


export const productsApiGet = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    try {
        let repository = getProductRepository(event.requestContext.stage);

        if(event.pathParameters && event.pathParameters.id) {
            if(!validateUuid(event.pathParameters.id))
                throw new BusinessError("Invlid Id");

            let product = await repository.getProduct(event.pathParameters.id);

            if(!product)
                return LambdaReturn.returnNotFound();

            return LambdaReturn.returnOk({id: product.getId(), description: product.getDescription(), price: product.getPrice()})
            
        } else {
            
            let products = await repository.getProducts();
            let queryReturn:any[] = [];
            products.forEach(element => {
                queryReturn.push({id: element.getId(), description: element.getDescription() ,price: element.getPrice()})
            });

            return LambdaReturn.returnOk(queryReturn);
        }
                    
    } catch(error:any) {
        console.log(error);
        return LambdaReturn.returnError(error);
    }   
};
