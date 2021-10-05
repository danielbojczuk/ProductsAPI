import { IProductRepository } from "../../Domain/IProductRepository";
import { validate as uuidValidate } from 'uuid';
import { ICommandHandler } from "./ICommandHandler";
import { BusinessError } from "../../Helpers/Exceptions/BusinessError";
import { UpdateProductCommand } from "../Commands/UpdateProductCommand";

export class UpdateProductCommandHandler implements ICommandHandler{
    private readonly productRepository:IProductRepository;
    private readonly command:UpdateProductCommand;

    constructor(productRepository:IProductRepository, command:UpdateProductCommand) {
        this.productRepository = productRepository;
        this.command = command;
    }

    public async execute() {
        if(!uuidValidate(this.command.id))
            throw new BusinessError("Invalid id");
        
        let produto = await this.productRepository.getProduct(this.command.id);
        
        if(!produto)
            return false;        

        produto.setDescription(this.command.description); 
        produto.setPrice(this.command.price);

        await this.productRepository.updateProduct(produto);

        return true;
    }    
}