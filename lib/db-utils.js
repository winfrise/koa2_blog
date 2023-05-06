const { query } = require('./mysql')

// 通过用户名查找用户
exports.findUserByUsername = (username) => {
    let _sql = `select * from le_admin where username="${username}";`
    return query(_sql)
}

// 查询栏目列表
exports.selectCategorys = () => {
    let _sql = `select * from le_category order by id desc`
    return query(_sql)
}

// 插入栏目
exports.insertCategory = (value) => {
    let _sql = "insert into le_category set ?"
    return query(_sql, value)
}

// 查询模型列表
exports.selectModels = () => {
    let _sql = `select * from le_models order by id desc`
    return query(_sql)
}

// 查询文章列表
exports.selectArticles = ({ currentPage, pageSize }) => {
    let _sql = ` select * from le_article  order by id desc limit ${(currentPage - 1) * pageSize},${pageSize} ;`
    return query(_sql)
}