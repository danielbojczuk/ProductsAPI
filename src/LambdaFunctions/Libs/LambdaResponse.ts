import { integer } from 'aws-sdk/clients/cloudfront';
import {IHeaderOption} from './IHeaderOption';

export type LambdaResponse = {
    headers: IHeaderOption;
    statusCode: integer;
    body: string;
};