export interface IDbClient {
    putItem(tableName:string, item:any):Promise<void>;
    getItems(tableName:string):Promise<any>;
    deleteItem(tableName:string, item:any):Promise<void>;
    getItem(tableName:string, item:any):Promise<any>;
    updateItem(tableName:string, updateKeys:any, updateExpression:string, updateValues:any):Promise<any>;
}