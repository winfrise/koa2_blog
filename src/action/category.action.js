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
        return arrayToTree(rows).sort((a, b) => {
            if (b.sort === a.sort) {
                return b.id - a.id
            }
            return b.sort - a.sort
        })
    }
}


module.exports = new CategoryAction(DB)
