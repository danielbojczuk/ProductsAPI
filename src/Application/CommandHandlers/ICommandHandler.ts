export interface ICommandHandler {
    execute():Promise<any>;
}