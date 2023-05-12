const Mysql = require('../lib/ctor-mysql.js');
const DB = new Mysql('admin');
const adminModel = require('../model/admin.model.js')(DB);

const userAction = {
    checkPass: async (username, password) => {
        const row = await adminModel.getInfoByJson({ username });
        if (Boolean(row)) {
            return row.password === password ? row : null;
        } else {
            console.log(`验证密码时找不到用户信息：${username}`);
            return;
        }
    }
};

module.exports = userAction;
