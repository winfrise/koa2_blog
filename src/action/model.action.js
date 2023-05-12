const Mysql = require('../lib/ctor-mysql')
const DB = new Mysql('models');
const BaseAction = require('./base.action.class')

class ModelAction extends BaseAction {

    constructor(db) {
        super(db)
    }
}


module.exports = new ModelAction(DB)
