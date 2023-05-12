/**
 * 管理员相关的数据库操作
 * @param DB
 */
const adminModel = DB => {
    return {
        async add(info) {
            try {
                return res = await DB.insert(info)
            } catch (err) {
                console.error(err)
            }
        },
        async update(id, info) {
            try {
                return res = await DB.update({ id }, info)
            } catch (err) {
                console.error(err)
            }
        },
        async getInfoByJson(info) {
            try {
                return res = await DB.fetchRow(info)
            } catch (err) {
                console.error(err)
            }
        },
    }
};

module.exports = adminModel;
