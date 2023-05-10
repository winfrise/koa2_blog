

const { selectCategorys, selectModels, findUserByUsername, selectArticles } = require('../../lib/db-utils.js')
const sqlApi = require('../../lib/db-utils.js')
const getFolderFiles = require('../../plugins/getFolderFiles.js')
const path = require('path')
const fs = require('fs')
const arrayToTree = require('../../plugins/arrayToTree.js')

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

exports.menuListGet = async ctx => {
    const result = await sqlApi.selectMenus()
    return {code: 200, message: '成功', data: {list: result}}

}

exports.categoryListGet = async ctx => {
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
// 插入文章
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
// 获取上传列表
exports.uploadsListGet = async ctx => {
    const {currentPage, pageSize} = ctx.request.body
    const [listRes, countRes] = await Promise.all([sqlApi.selectUploads({ currentPage, pageSize }), sqlApi.getUploadsCount()])
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: listRes,
            total: countRes[0].count
        }
    }
}

// 获取资源列表
exports.resourceListGet = async ctx => {
    const {currentPage, pageSize} = ctx.request.body
    const [listRes, countRes] = await Promise.all([sqlApi.selectResource({ currentPage, pageSize }), sqlApi.getResourceCount()])
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: listRes,
            total: countRes[0].count
        }
    }
}
// 资源详情
exports.resourceDetailsGet = async ctx => {
    const { id } = ctx.request.body
    const result = await sqlApi.findResourceById(id)
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            details: result[0]
        }
    }
}

// 更新资源
exports.resourceDetailsUpdate = async ctx => {
    const { id, name, status } = ctx.request.body
    await sqlApi.updateResourceById({ id, name, status })
    
    ctx.body = {
        code: 200,
        message: '成功',
        data: {}
    }
}

// 获取批量上传列表
exports.uploadTemporaryGet = async ctx => {
    const uploadTempPath = path.resolve(__dirname, '../../../upload-temp')
    const files = getFolderFiles(uploadTempPath)
    const lock = fs.existsSync(uploadTempPath + '/.lock')
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: files,
            lock
        }
    }
}

/**
 * 上传单个文件
 */
exports.uploadSingle = async ctx => {
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            filename: ctx.request.file//返回文件名
        }
    }
}

// 批量上传，需要手动上传文件
exports.uploadBatch = async ctx  => {
    const { fileList } = ctx.request.body
    
    const uploadTempPath = path.resolve(__dirname, '../../../upload-temp')
    if (fs.existsSync(uploadTempPath + '/.lock')) {
        ctx.body = {
            code: 5002,
            message: '请删除锁定的文件后再上传',
            data: {}
        }
        return
    }

    await sqlApi.insertResource(fileList)
    fs.writeFileSync(uploadTempPath + '/.lock', '')
    ctx.body = {
        code: 200,
        message: '成功',
        data: {

        }
    }
}