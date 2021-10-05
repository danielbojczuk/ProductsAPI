import { IProductRepository } from "../../Domain/IProductRepository";
import { Product } from "../../Domain/Product";
import { InsertProductCommand } from "../Commands/InsertProductCommand";
import { InsertProductResponse } from "../Responses/InsertProductResponse";
import { ICommandHandler } from "./ICommandHandler";

export class InsertProductCommandHandler implements ICommandHandler{
    private readonly productRepository:IProductRepository;
    private readonly command:InsertProductCommand;

    constructor(productRepository:IProductRepository, command:InsertProductCommand) {
        this.productRepository = productRepository;
        this.command = command;
    }

    public async execute() {
        let product = new Product(this.command.description,this.command.price);
        await this.productRepository.newProduct(product);
        
        let response:InsertProductResponse = {
            id: product.getId(),
            description: product.getDescription(),
            price: product.getPrice()
        }
        
        return response;
    }    
}