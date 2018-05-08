# mysql-helper-es6
mysql 帮助类，支持 `async` / `await`
在 Node.js v8.11.1 运行良好
## Usage
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

// 查询一条或多条数据
// 第1种写法
mysqlHelper.select('table_name', ['*'], {field1: 1, field2: 2})
    .then((values)=>{
        console.log(`val = ${values}`);
    }).catch((err)=>{
        console.log(err.stack);
    });
// 第2种写法
try {
    let values = await mysqlHelper.select('table_name', ['*'], {field1: 1, field2: 2});
    console.log(`val = ${values}`);
} catch (err) {
    console.log(err.stack);
}
```
