const { query } = require('./mysql')

// 通过用户名查找用户
exports.findUserByUsername = (username) => {
    let _sql = `select * from le_admin where username="${username}";`
    return query(_sql)
}

exports.selectMenus = () => {
    let _sql = `select * from le_category where is_menu=1 order by sort desc,id asc`
    return query(_sql)
}
// 查询栏目列表
exports.selectCategories = () => {
    let _sql = `select * from le_category order by sort desc,id asc`
    return query(_sql)
}

exports.selectChildCategoryById = ({page_size, current_page,  id}) => {
    let _sql = `select * from le_category where parent_id=${id} order by id desc limit ${(current_page - 1) * page_size},${page_size} `
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

exports.deleteCategoryById = (id) => {
    let _sql = `delete from le_category where id="${id}";`
    return query( _sql )
}

exports.updateCategoryById = ({ id, is_menu, sort }) => {
    let field, value
    if (is_menu !== undefined) {
        field = 'is_menu'
        value = is_menu
    } else {
        field = 'sort'
        value = sort
    }
    let _sql = `update le_category set ${field}=? where id=${id}`
    return query(_sql, [value])

}

// 查询模型列表
exports.selectModels = () => {
    let _sql = `select * from le_models order by id desc`
    return query(_sql)
}

// 查询文章列表
exports.selectArticles = ({ current_page, page_size, category_id }) => {
    let _sql = `select * from le_article ${ category_id ? 'where category_id=' + category_id : ''} order by id desc limit ${(current_page - 1) * page_size},${page_size} ;`
    return query(_sql)
}

exports.insertArticle = (values) => {
    let _sql = "insert into le_article set category_id=?,title=?,keywords=?,description=?,image_url=?,is_recommend=?,is_top=?,is_show=?,create_time=?,hits=?,url=?,content=?"
    return query(_sql, [values.category_id, values.title, values.keywords, values.description, values.image_url, values.is_recommend, values.is_top, values.is_show, values.create_time, values.hits, values.url, values.content])

}

exports.findArticleById = (id) =>  {
    let _sql = `select * from le_article where id=${id}`
    return query(_sql)
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

// 批量定入资源
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

// 获取资源详情
exports.findResourceById = (id) => {
    let _sql = `select * from le_resource where id=${id}`
    return query(_sql)
}

// 更新资源
exports.updateResourceById = ({ id, name, status }) => {
    const values = [name, status, id]
    let _sql = `update le_resource set name=?,status=? where id=?`
    return query(_sql, values)
}

