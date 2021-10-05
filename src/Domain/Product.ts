import { v4 as uuidv4 } from 'uuid';
import { validate as validateUuid } from 'uuid';
import { BusinessError } from '../Helpers/Exceptions/BusinessError';

export class Product {
    private id: string;
    private description: string;
    private price: number;

    private validationIssues:string[];

    constructor(description:string, price:number, id:string|null = null) {
        if(!id)
            this.id = uuidv4();
        else
            this.id = id;

        this.description = description;
        this.price = price;
        this.validationIssues = [];

        this.validate();
    }

    public setDescription(description:string) {
        this.description = description;
        this.validate();
    }

    public setPrice(price:number) {
        this.price = price;
        this.validate();
    }

    public getDescription() {
        return this.description;
    }

    public getPrice() {
        return this.price;
    }

    public getId() {
        return this.id;
    }

    private validate() {
        if(this.description==null)
            this.validationIssues.push("Ivalid description");
        
        if(this.price==null || typeof this.price != "number")
            this.validationIssues.push("Invalid price");

        if(!validateUuid(this.id))
            this.validationIssues.push("Invalid Id");
        
        if(this.validationIssues.length > 0) {
            let errorMessage:string = "Invalid product:"
            
            this.validationIssues.forEach(element => {
                errorMessage += "\n - "+element;
            });
            
            throw new BusinessError(errorMessage);
        }
    }
}
