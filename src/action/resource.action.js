const Mysql = require('../lib/ctor-mysql')
const DB = new Mysql('resource');
const BaseAction = require('./base.action.class')

class ResourceAction extends BaseAction {

    constructor(db) {
        super(db)
    }
}


module.exports = new ResourceAction(DB)
