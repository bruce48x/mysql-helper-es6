# mysql-helper-es6
mysql 帮助类，用 es2017 语法编写

在 Node.js v8.x 运行良好

* 如果需要 ts 版本，可以看看 [ts-mysql-helper](https://github.com/bruce48x/ts-mysql-helper)

## Usage
### 初始化
```javascript
const MysqlHelper = require('mysql-helper-es6')
const mysqlConfig = {
    host: 'localhost',
    port: 3306,
    database: 'mydb'
    user: 'root',
    password: 123456,
    charset: 'utf8mb4'
};
const helper = MysqlHelper.getInstance(mysqlConfig);
```
### 查询多条数据
```javascript
// 第1种，promise 写法
const tableName = 'my_table';
const fields = ['name', 'age'];
const where = {id: 1};
const limit = 1;
const helper = MysqlHelper.getInstance();
helper.select(tableName, fields, where, limit)
    .then((values)=>{
        console.log(`val = ${values}`);
    }).catch((err)=>{
        console.log(err.stack);
    });
// 第2种，async / await 写法
const tableName = 'my_table';
const fields = ['name', 'age'];
const where = {id: 1};
const limit = 1;
(async () => {
    try {
        let values = await helper.select(tableName, fields, where, limit);
        console.log(`val = ${values}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```
### 更复杂的查询
```javascript
const tableName = 'my_table';
const fields = ['name', 'age'];
// 范围查询
const where = {id: {
    '>=': 1,
    '<': 10
}};
const limit = 1;
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let values = await helper.select(tableName, fields, where, limit);
        console.log(`val = ${values}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```
### 查询一条数据
```javascript
const tableName = 'my_table';
const fields = ['name', 'age'];
const where = {id: 1};
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let values = await helper.selectOne(tableName, fields, where);
        console.log(`val = ${values}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```
### 插入数据
```javascript
const tableName = 'my_table';
const values = {name: 'bruce', age: 28};
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let insertId = await helper.insertInto(tableName, values);
    } catch (err) {
        console.log(err.stack);
    }
})();

```
### 批量插入数据
```javascript
const tableName = 'my_table';
const fieldsArr = ['name', 'age'];
const valueArr = [
    ['bruce', 28],
    ['chris', 29],
    ['doris', 30]
];
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let results = await helper.batchInsertInto(tableName, fieldsArr, valueArr);
        for (let r of results) {
            console.log('inserted id =', r.insertId);
        }
    } catch (err) {
        console.log(err.stack);
    }
})();
```

### 插入或更新数据
```javascript
const tableName = 'my_table';
const values = {name: 'bruce', age: 28};
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let insertId = await helper.replaceInto(tableName, values);
    } catch (err) {
        console.log(err.stack);
    }
})();
```

### 更新数据
```javascript
const tableName = 'my_table';
const values = {name: 'bruce'};
const where = {id: 1};
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let results = await helper.update(tableName, values, where);
        console.log(`res = ${results}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```

### 删除数据
```javascript
const tableName = 'my_table';
const where = {id: 1};
const helper = MysqlHelper.getInstance();
(async () => {
    try {
        let affectedRows = await helper.delete(tableName, where);
        console.log(`res = ${affectedRows}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```