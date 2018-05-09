const mysql = require("mysql");
const lodash = require('lodash');

class MysqlHelper {
    constructor(mysqlConfig) {
        this._pool = mysql.createPool({
            host: mysqlConfig.host,
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.database,
            port: mysqlConfig.port
        });
    };

    static getInstance(mysqlConfig) {
        if (!MysqlHelper.instance) {
            MysqlHelper.instance = new MysqlHelper(mysqlConfig);
        }
        return MysqlHelper.instance;
    };

    /**
     * 查询 mysql
     * 不要直接使用这个函数
     * 而应该用 insertInto / select / selectOne 等函数
     * @param {String} sql sql语句
     * @param {Object | Array} args 参数
     * @private
     */
    _query(sql, args) {
        return new Promise((resolve, reject) => {
            this._pool.getConnection(function (err, conn) {
                if (err) {
                    reject(err);
                    return;
                }
                conn.query(sql, args, function (err, results, fields) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    resolve({results: results, fields: fields});
                });
            });
        });
    };

    /**
     * mysql insert function
     * @param {String} table 表名
     * @param {Object} values
     * @return {*}
     */
    async insertInto(table, values) {
        let sql = `insert into ${table} set ?`;
        let {res} = await this._query(sql, values);
        return res.insertId;
    };

    /**
     * mysql select function
     * @param {String} table 表名
     * @param {Array} fields 字段名
     * @param {Object} where
     * @param {Number} limit 限制取几条
     * @return {*}
     */
    async select(table, fields, where, limit) {
        let fieldsStr = fields.join(', ');
        let sql = `select ${fieldsStr} from ${table}`;
        // condition 和 condArgs 可能为空数组
        let condArgs;
        if (!lodash.isEmpty(where)) {
            let condition = Object.keys(where);
            condArgs = Object.values(where);
            if (condition && condition.length > 0 && condArgs && condArgs.length > 0) {
                sql += ' where ' + condition.join(' = ? and ') + ' = ?';
            }
        }
        // limit 可能为空
        if (limit) {
            sql += ` limit ${limit}`;
        }
        let {results} = await this._query(sql, condArgs);
        return results;
    };

    /**
     * mysql select function
     * @param {String} table 表名
     * @param {Array} fields 字段名
     * @param {Object} where
     * @return {*}
     */
    async selectOne(table, fields, where) {
        let res = await this.select(table, fields, where, 1);
        return res[0];
    };

    /**
     * mysql update function
     * @param table
     * @param values
     * @param where
     * @return {Promise<*>}
     */
    async update(table, values, where) {
        let sql = `update ${table} set `;
        // 转 values 为 sql
        let keys, vals, args = [];
        keys = Object.keys(values);
        vals = Object.values(values);
        if (keys && keys.length > 0 && vals && vals.length > 0) {
            sql += ' ' + keys.join(' = ? and ') + ' = ?';
            args = [...vals];
        }
        // 转 where 为 sql
        keys = Object.keys(where);
        vals = Object.values(where);
        if (keys && keys.length > 0 && vals && vals.length > 0) {
            sql += ' where ' + keys.join(' = ? and ') + ' = ?';
            args = [...args, ...vals];
        }
        let {results} = await this._query(sql, args);
        return results;
    }
}

module.exports = MysqlHelper;
