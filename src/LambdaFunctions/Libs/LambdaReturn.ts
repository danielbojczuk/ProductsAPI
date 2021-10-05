import { BusinessError } from "../../Helpers/Exceptions/BusinessError";

export class LambdaReturn {
    static returnCreated(objectCreated:any) {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 201,
            body: JSON.stringify(objectCreated),
        }
    }

    static returnOk(content:any|null = null) {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify(content),
        }
    }

    static returnNotFound() {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 404,
            body: JSON.stringify({}),
        }
    }

    static returnError(error:Error) {
        let returnStatusCode = 500;
        let returnMessage = "Internal Server Error!"

        if(error instanceof BusinessError) {
            returnStatusCode = 400;
            returnMessage = error.message;
        }
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: returnStatusCode,
            body: JSON.stringify(returnMessage),
        }
    }
}