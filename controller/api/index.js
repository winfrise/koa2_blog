

const { selectCategorys, insertCategory, selectModels, findUserByUsername, selectArticles } = require('../../lib/db-utils.js')

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
                var node = {
                    ...arr[i],
                    children: arrayToTree(arr, arr[i].id)
                };
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
    const { name, description, sort, is_menu, parent_id, model_id } = ctx.request.body
    const create_time = Math.ceil(Date.now() / 1000)
    await insertCategory({ name, description, sort, is_menu, parent_id, model_id, create_time, update_time: create_time })
    ctx.body = {
        code: 200,
        message: '成功',
        data: {

        }
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