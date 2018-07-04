export default class MysqlHelper {
    static getInstance(config: any): MysqlHelper;
    constructor(config: any);
    async insertInto(table: string, values: Map): number;
    async batchInsertInto(table: string, fieldsArr: any, valueArr: any): any;
    async replaceInto(table: string, values: any): number;
    async select(table: string, fields: any, where: any, limit?: number): any;
    async selectOne(table: string ,fields: any, where: any): any;
    async update(table: string, values: any, where: any): any;
    async delete(table: string, where: any, limit?: number): number;
}