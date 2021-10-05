import {RestClient} from 'typed-rest-client'

export class ThirdPartySupplyChain {
    private restClient:RestClient;

    constructor(url:string) {
        this.restClient = new RestClient('rest-cliet',url);
    }

    public async addProduct(product:any) {
        let response = await this.restClient.create('test/supply-chain',product);
        console.log(response);
    }

    public async deleteProduct(product:any) {
        let response = await this.restClient.del('test/supply-chain/'+product.id);
        console.log(response);
    }

    public async updateProduct(product:any) {
        let response = await this.deleteProduct(product);
        console.log(response);
        response = await this.addProduct(product);
        console.log(response);
    }
}