import {IProductRepository} from '../../src/Domain/IProductRepository'
import { Product } from '../../src/Domain/Product';
export class ProductRepository implements IProductRepository {

    private product:Product|null;

    constructor(product:Product|null = null) {
        this.product = product;
    }

    public async getProduct(id: string): Promise<Product|null> {
        return this.product;
    }
    public async getProducts(): Promise<Product[]> {
        let returnList = [];
        if(this.product)
            returnList.push(this.product);
        return returnList;
    }
    public async newProduct(product: Product): Promise<void> {
        await new Promise<void>(resolve => resolve()); 
    }
    public async updateProduct(product: Product): Promise<void> {
        await new Promise<void>(resolve => resolve()); 
    }
    public async deleteProduct(idProduct: string): Promise<void> {
        await new Promise<void>(resolve => resolve()); 
    }

}