declare interface IMyEvent {
    on(event: 'acquire', listener: (conn: any) => void): this;
    on(event: 'conneciton', listener: (conn: any) => void): this;
    on(event: 'enqueue', listener: () => void): this;
    on(event: 'release', listener: (conn: any) => void): this;
}
export declare class MysqlHelper implements IMyEvent {
    static getInstance(config: any): MysqlHelper;
    constructor(config: any);
    async insertInto(table: string, values: Map): number;
    async batchInsertInto(table: string, fieldsArr: any, valueArr: any): any;
    async replaceInto(table: string, values: any): number;
    async select(table: string, fields: any, where: any, limit?: number): any;
    async selectOne(table: string, fields: any, where: any): any;
    async update(table: string, values: any, where: any): any;
    async delete(table: string, where: any, limit?: number): number;
}