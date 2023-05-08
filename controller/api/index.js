

const { selectCategorys, selectModels, findUserByUsername, selectArticles } = require('../../lib/db-utils.js')
const sqlApi = require('../../lib/db-utils.js')

exports.login = async ctx => {
    let { username, password } = ctx.request.body
    const res = await findUserByUsername(username)

    if (res.length === 0 || username !== res[0]['username'] || password !== res[0]['password']) {
        ctx.body = {
            code: 500,
            message: '用户名或密码错误'
        }
        return
    }

    ctx.session = {
        user: res[0]['name'],
        id: res[0]['id']
    }

    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            token: 'token_' + username
        }
    }
}

exports.categoryListGet = async ctx => {
    function arrayToTree(arr, parent_id) {
        var tree = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].parent_id === parent_id) {
                const children = arrayToTree(arr, arr[i].id)
                var node = {
                    ...arr[i]
                };
                if (children.length > 0) {
                    node.children = children
                }
                tree.push(node);
            }
        }
        return tree;
    }
    
    const result = await selectCategorys()
    const tree = arrayToTree(result, 0)

    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: tree
        }
    }
}

exports.categoryAdd = async ctx => {
    const { id, type, name, description, sort, is_menu, parent_id, model_id } = ctx.request.body
    const data = { type, name, description, sort, is_menu, parent_id, model_id, id }
    const now_time = Math.ceil(Date.now() / 1000)
    try {
        if (id) {
            console.log('update Category')
            await sqlApi.updateCategory({ ...data, update_time: now_time })
        } else {
            console.log('insert Category')
            await sqlApi.insertCategory({ ...data, create_time: now_time, update_time: now_time })
        }
        ctx.body = {
            code: 200,
            message: '成功',
            data: {

            }
        }
    } catch (e) {
        ctx.body = {
            code: 5001
        }
    }

}

exports.categoryFind = async ctx => {
    const { id } = ctx.request.body
    const result = await sqlApi.findCategoryById(id)
    if (!result) {
        ctx.body = {
            code: 200,
            message: '未查询到',
            data: {}
        }
        return
    }
    ctx.body = {
        code: 200,
        message: '成功',
        data: result[0]
    }
} 

// 获取模型列表
exports.modelsListGet = async ctx => {
    const result = await selectModels()
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: result
        }
    }
}

// 获取文章列表
exports.articleListGet = async ctx => {
    const { currentPage, pageSize } = ctx.request.body
    const result = await selectArticles({ currentPage, pageSize })
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: result,
            total: 0
        }
    }
}

exports.articleInsert = async ctx => {
    const data = ctx.request.body
    const result = await sqlApi.insertArticle(data)
    ctx.body = {
        code: 200,
        message: '成功',
        data: {}
    }
}

/**
 * 资源管理
 */
exports.resourceListGet = async ctx => {
    const {currentPage, pageSize} = ctx.request.body
    const [listRes, countRes] = await Promise.all([sqlApi.selectResources({ currentPage, pageSize }), sqlApi.getResourceCount()])
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: listRes,
            total: countRes[0].count
        }
    }
}