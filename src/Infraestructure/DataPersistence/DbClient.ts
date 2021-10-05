import { IDbClient } from "./IDbClient";
import { DynamoDB } from "aws-sdk";

export class DbClient implements IDbClient {

    private dynamoDb: DynamoDB.DocumentClient;

    constructor(region:string|null, endpoint: string|null) {
        if(region && endpoint)
            this.dynamoDb = new DynamoDB.DocumentClient( {
                region: region,
                endpoint: endpoint
            });
        else
            this.dynamoDb = new DynamoDB.DocumentClient();
    }

    public async getItem(tableName: string, queryItem: any): Promise<any> {
        const query = {
            "TableName": tableName,
            "Key": queryItem            
        }
        console.log(query);
        return (await this.dynamoDb.get(query).promise()).Item;
    }

    public async getItems(tableName: string): Promise<any> {
        const query = {
            "TableName": tableName        
        }
        console.log(query);
        return await this.dynamoDb.scan(query).promise()
    }
    
    public async updateItem(tableName:string, updateKeys:any, updateExpression:string, updateValues:any):Promise<any> {
        const itemDelete = {
            TableName: tableName,
            Key: updateKeys,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: updateValues
        }
        
        await this.dynamoDb.update(itemDelete).promise();
    }

    public async deleteItem(tableName: string, item: any): Promise<void> {
        const itemDelete = {
            TableName: tableName,
            Key: item
        };
        await this.dynamoDb.delete(itemDelete).promise();
    }

    public async putItem(tableName:string, item:any): Promise<void>{
        const itemPut = {
            TableName: tableName,
            Item: item
        }
        
        await this.dynamoDb.put(itemPut).promise();
    }    
}