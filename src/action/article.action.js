const Mysql = require('../lib/ctor-mysql')
const DB = new Mysql('article');
const BaseAction = require('./base.action.class')

class ArticleAction extends BaseAction {

    constructor(db) {
        super(db)
    }
}


module.exports = new ArticleAction(DB)
