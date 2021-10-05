import { IProductRepository } from "../../Domain/IProductRepository";
import { Product } from "../../Domain/Product";
import { IDbClient } from "./IDbClient";


export class ProductRepository implements IProductRepository {    

    private dbClient: IDbClient;

    constructor(dbClient: IDbClient) {
        this.dbClient = dbClient;
    }

    public async getProduct(idItem: string): Promise<Product|null> {
        const queryItem = {
           id: idItem
        };

        let item = await this.dbClient.getItem("Products",queryItem);
        if(item)
            return new Product(item.description, item.price, item.id);
        else    
            return null;
    }

    public async getProducts(): Promise<Product[]> {
        let itens = await this.dbClient.getItems("Products");       
        let products:Product[] = [];
        if(itens) {
            itens.Items.forEach((element: { description: string; price: number; id: string | null | undefined; }) => {
                products.push(new Product(element.description, element.price, element.id));
            });
        }
        return products;
    }

    public async newProduct(product: Product): Promise<void> {      
        await this.dbClient.putItem("Products",product);
    }

    public async updateProduct(product: Product): Promise<void> {
        const updateKeys = {
            id: product.getId()
        };

        const updateExpression = "set description = :n, price = :p";

        const updateValues = {
            ":n": product.getDescription(),
            ":p": product.getPrice()
        }
        
        await this.dbClient.updateItem("Products",updateKeys,updateExpression,updateValues);
    }
    
    public async deleteProduct(idProduct: string): Promise<void> {
        const deleteKey = {
            id:idProduct
        }
        await this.dbClient.deleteItem("Products",deleteKey);
    }
    
}