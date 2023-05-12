const mysql = require('mysql')
const config = require('../config/default.js')

class Pool {
    constructor() {
        this.pool = this.init()
    }

    init() {
        return mysql.createPool({
            host: config.database.HOST,
            user: config.database.USERNAME,
            password: config.database.PASSWORD,
            database: config.database.DATABASE,
            port: config.database.PORT
        })
    }
}

module.exports = new Pool(config)