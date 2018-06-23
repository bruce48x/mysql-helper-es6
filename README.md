# mysql-helper-es6
mysql 帮助类，支持 `async` / `await`

在 Node.js v8.11.1 运行良好
## Usage
### 创建连接
```javascript
const mysqlHelper = require('mysql-helper-es6')
const mysqlConfig = {
    host: 'localhost',
    port: 3306,
    database: 'test'
    user: 'root',
    password: 123456
};
mysqlHelper.init(mysqlConfig);
```
### 查询多条数据
```javascript
// 第1种，promise 写法
const tableName = 'my_table';
const fields = ['name', 'age'];
const where = {id: 1};
const limit = 1;
mysqlHelper.select(tableName, fields, where, limit)
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
        let values = await mysqlHelper.select(tableName, fields, where, limit);
        console.log(`val = ${values}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```
### 查询一条数据
```javascript
// async / await 写法
const tableName = 'my_table';
const fields = ['name', 'age'];
const where = {id: 1};
(async () => {
    try {
        let values = await mysqlHelper.selectOne(tableName, fields, where);
        console.log(`val = ${values}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```
### 插入数据
```javascript
// async / await 写法
const tableName = 'my_table';
const values = {name: 'bruce', age: 28};
(async () => {
    try {
        let insertId = await mysqlHelper.insertInto(tableName, values);
    } catch (err) {
        console.log(err.stack);
    }
})();

```
### 批量插入数据
```javascript
// async / await 写法
const tableName = 'my_table';
const fieldsArr = ['name', 'age'];
const valueArr = [
    ['bruce', 28],
    ['chris', 29],
    ['doris', 30]
];
(async () => {
    try {
        let results = await mysqlHelper.batchInsertInto(tableName, fieldsArr, valueArr);
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
// async / await 写法
const tableName = 'my_table';
const values = {name: 'bruce', age: 28};
(async () => {
    try {
        let insertId = await mysqlHelper.replaceInto(tableName, values);
    } catch (err) {
        console.log(err.stack);
    }
})();
```

### 更新数据
```javascript
// async / await 写法
const tableName = 'my_table';
const values = {name: 'bruce'};
const where = {id: 1};
(async () => {
    try {
        let results = await mysqlHelper.update(tableName, values, where);
        console.log(`res = ${results}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```

### 删除数据
```javascript
// async / await 写法
const tableName = 'my_table';
const where = {id: 1};
(async () => {
    try {
        let affectedRows = await mysqlHelper.delete(tableName, where);
        console.log(`res = ${affectedRows}`);
    } catch (err) {
        console.log(err.stack);
    }
})();
```