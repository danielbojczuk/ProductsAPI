import { DbClient } from '../../Infraestructure/DataPersistence/DbClient';
import { ProductRepository } from '../../Infraestructure/DataPersistence/ProductRepository';

function getDbClient(stage:string) {
    if(stage == "local")
        return new DbClient("localhost","http://localhost:8000");
    else 
        return new DbClient(null,null);
}

export const getProductRepository = (stage:string) => {
    return new ProductRepository(getDbClient(stage));
}