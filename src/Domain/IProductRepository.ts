import { Product } from "./Product";
export interface IProductRepository {
    getProduct(id:string): Promise<Product|null>;
    getProducts(): Promise<Product[]>;
    newProduct(product:Product): Promise<void>;
    updateProduct(product:Product): Promise<void>;
    deleteProduct(idProduct:string): Promise<void>;
}