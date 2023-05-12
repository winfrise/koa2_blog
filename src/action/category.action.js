const Mysql = require('../lib/ctor-mysql')
const DB = new Mysql('category');
const BaseAction = require('./base.action.class')
const arrayToTree = require('../plugins/arrayToTree')

class CategoryAction extends BaseAction {
    
    constructor(db) {
        super(db)
    }
    async getTree () {
        const rows = await this.getAll()
        return arrayToTree(rows)
    }
}


module.exports = new CategoryAction(DB)
