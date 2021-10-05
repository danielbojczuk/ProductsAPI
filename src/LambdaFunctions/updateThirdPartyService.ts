import { ThirdPartySupplyChain } from "../Infraestructure/ExternalAccess/ThirdPartySupplyChain";

export const updateThirdPartyService = async (event:any, context:any, callback:any) => {
    try {
        let thirdParty = new ThirdPartySupplyChain('https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/');

        console.log("Updating third party: "+event.Records[0].eventName);

        switch(event.Records[0].eventName) {
            case "INSERT": {
                let product = {
                    id: event.Records[0].dynamodb.NewImage.id.S,
                    name: event.Records[0].dynamodb.NewImage.description.S,
                    price: event.Records[0].dynamodb.NewImage.price.N
                }
                await thirdParty.addProduct(product);
                break;
            }
            case "MODIFY": {
                let product = {
                    id: event.Records[0].dynamodb.NewImage.id.S,
                    name: event.Records[0].dynamodb.NewImage.description.S,
                    price: event.Records[0].dynamodb.NewImage.price.N
                }
                await thirdParty.updateProduct(product);
                break;
            }
            case "REMOVE": {
                let product = {
                    id: event.Records[0].dynamodb.Keys.id.S
                }
                await thirdParty.deleteProduct(product);
                break;
            }
        }
        console.log("Third party updated!");
    } catch(error:any) {
        console.log(error);
        callback(error.message,null);
    }   
};
