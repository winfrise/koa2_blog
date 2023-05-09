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
    let _sql = "insert into le_category set type=?,name=?,description=?,sort=?,is_menu=?,parent_id=?,model_id=?,create_time=?,update_time=?"
    return query(_sql, [values.type, values.name, values.description, values.sort, values.is_menu, values.parent_id, values.model_id,values.create_time , values.update_time, values.id])
}
// 更新分类
exports.updateCategory = (values) => {
    let _sql = `update le_category set type=?,name=?,description=?,sort=?,is_menu=?,parent_id=?,model_id=?,update_time=? where id=?`
    return query(_sql, [values.type, values.name, values.description, values.sort, values.is_menu, values.parent_id, values.model_id, values.update_time, values.id])
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

exports.insertArticle = (values) => {
    let _sql = "insert into le_article set category_id=?,title=?,keywords=?,description=?,image_url=?,is_recommend=?,is_top=?,is_show=?,create_time=?,hits=?,url=?,content=?"
    return query(_sql, [values.category_id, values.title, values.keywords, values.description, values.image_url, values.is_recommend, values.is_top, values.is_show, values.create_time, values.hits, values.url, values.content])

}

/**
 * 资源
 */
// 获取资源列表
exports.selectUploads = ({ currentPage, pageSize }) => {
    let _sql = ` select * from le_upload  order by id desc limit ${(currentPage - 1) * pageSize},${pageSize} ;`
    return query(_sql)
}
// 获取资源数量
exports.getUploadsCount = () => {
    let _sql = `select count(*) as count from le_upload`
    return query(_sql)
}

exports.selectResource = ({ currentPage, pageSize }) => {
    let _sql = ` select * from le_resource  order by id desc limit ${(currentPage - 1) * pageSize},${pageSize} ;`
    return query(_sql)
}
// 获取资源数量
exports.getResourceCount = () => {
    let _sql = `select count(*) as count from le_resource`
    return query(_sql)
}

exports.insertResource =  (list) => {
    return new Promise(( resolve, reject ) => {
        list.forEach(async item => {
            const currentTime = Math.ceil(Date.now() / 1000)
            const values = [item.name, item.file_size, currentTime,item.filename, item.file_path, item.suffix]
            let _sql = `insert into le_resource set name=?,file_size=?, create_time=?,filename=?,file_path=?,suffix=?;`
            await query( _sql, values )
        })
        resolve()
    })

}