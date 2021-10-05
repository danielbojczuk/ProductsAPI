import { IProductRepository } from "../../Domain/IProductRepository";
import { validate as uuidValidate } from 'uuid';
import { ICommandHandler } from "./ICommandHandler";
import { DeleteProductCommand } from "../Commands/DeleteProductCommand";
import { BusinessError } from "../../Helpers/Exceptions/BusinessError";

export class DeleteProductCommandHandler implements ICommandHandler{
    private readonly productRepository:IProductRepository;
    private readonly command:DeleteProductCommand;

    constructor(productRepository:IProductRepository, command:DeleteProductCommand) {
        this.productRepository = productRepository;
        this.command = command;
    }

    public async execute() {
        if(!uuidValidate(this.command.id))
            throw new BusinessError("Invalid id");
        
        let produto = await this.productRepository.getProduct(this.command.id);
        
        if(!produto)
            return false;        

        await this.productRepository.deleteProduct(this.command.id);      
        return true;
    }    
}