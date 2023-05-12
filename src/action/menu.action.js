const Mysql = require('../lib/ctor-mysql')
const DB = new Mysql('category');
const menuModel = require('../model/menu.model')(DB)

const BaseAction = require('./base.action.class')

const arrayToTree = require('../plugins/arrayToTree')

class MenuAction extends BaseAction {

    constructor(db) {
        super(db)
    }
    /**
     * 获取树形结构
     * @param info
     * @returns {Promise<void>}
     */
    async getTreeMenu() {
        let sqlMod = `SELECT * FROM \`le_category\` is_menu=1 order by sort desc,id asc`;
        const rows = await super.getAll(sqlMod);
        return arrayToTree(rows);
    }

}


const menuAction = new MenuAction(DB)
module.exports = menuAction
