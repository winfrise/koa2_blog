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

// 通过id查找分类
exports.findCategoryById = (id) => {
    let _sql = `select * from le_category where id="${id}";`
    return query(_sql)
}

// 插入栏目
exports.insertCategory = (values) => {
    let _sql = "insert into le_category set ?"
    return query(_sql, values)
}
// 更新分类
exports.updateCategory = (values) => {
    console.log([values.type, values.name, values.description, values.sort, values.is_menu, values.parent_id, values.model_id, values.id])
    let _sql = `update le_category set type=?,name=?,description=?,sort=?,is_menu=?,parent_id=?,model_id=? where id=?`
    return query(_sql, [values.type, values.name, values.description, values.sort, values.is_menu, values.parent_id, values.model_id, values.id])
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