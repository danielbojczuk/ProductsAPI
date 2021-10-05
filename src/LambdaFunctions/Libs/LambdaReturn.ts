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
        let responseContent:any;
        if(content == null) {
            responseContent = "";
        } else {
            responseContent = content;
        }
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify(responseContent),
        }
    }

    static returnNotFound() {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 404,
            body: JSON.stringify({"message":"Resource not found."}),
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
            body: JSON.stringify({"message": returnMessage}),
        }
    }
}