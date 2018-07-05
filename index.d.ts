declare interface IMyEvent {
    on(event: 'acquire', listener: (conn: any) => void): this;
    on(event: 'conneciton', listener: (conn: any) => void): this;
    on(event: 'enqueue', listener: () => void): this;
    on(event: 'release', listener: (conn: any) => void): this;
}
export declare class MysqlHelper implements IMyEvent {
    static getInstance(config: any): MysqlHelper;
    constructor(config: any);
    insertInto(table: string, values: any): Promise<number>;
    batchInsertInto(table: string, fieldsArr: any, valueArr: any): Promise<any>;
    replaceInto(table: string, values: any): Promise<number>;
    select(table: string, fields: any, where: any, limit?: number): Promise<any>;
    selectOne(table: string, fields: any, where: any): Promise<any>;
    update(table: string, values: any, where: any): Promise<any>;
    delete(table: string, where: any, limit?: number): Promise<number>;
    on();
}