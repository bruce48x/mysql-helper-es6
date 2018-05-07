const mysql = require("mysql");
const lodash = require('lodash');

class mysqlHelper {
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
        if (!mysqlHelper.instance) {
            mysqlHelper.instance = new mysqlHelper(mysqlConfig);
        }
        return mysqlHelper.instance;
    };

    /**
     * 查询 mysql
     * 不要直接使用这个函数
     * 而应该用 insertInto / select / selectOne 等函数
     * @param {String} sql sql语句
     * @param {Object | Array} args 参数
     * @private
     */
    _query = function (sql, args) {
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
     * @param {Object} args
     * @param {Number} limit 限制取几条
     * @return {*}
     */
    select = async function (table, fields, args, limit) {
        let fieldsStr = fields.join(', ');
        let sql = `select ${fieldsStr} from ${table}`;
        // condition 和 condArgs 可能为空数组
        let condArgs;
        if (!lodash.isEmpty(args)) {
            let condition = Object.keys(args);
            condArgs = Object.values(args);
            if (condition && condition.length > 0 && condArgs && condArgs.length > 0) {
                let conditionStr = ' ' + condition.join(' = ? and ');
                conditionStr += ' = ?';
                sql += conditionStr;
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
     * @param {Array} condition 条件
     * @param {Array} condArgs 条件值
     * @return {*}
     */
    async selectOne(table, fields, args) {
        let res = await this.select(table, fields, args, 1);
        return res[0];
    };
}

module.exports = mysqlHelper;
