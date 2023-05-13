const getFolderFiles = require('../../plugins/getFolderFiles.js')
const path = require('path')
const fs = require('fs')
const arrayToTree = require('../../plugins/arrayToTree.js')

const adminAction = require('../../action/admin.action.js')
const modelAction = require('../../action/model.action.js')
const categoryAction = require('../../action/category.action.js')
const resourceAction = require('../../action/resource.action.js')
const articleAction = require('../../action/article.action.js')

exports.login = async ctx => {
    let { username, password } = ctx.request.body
    const user = await adminAction.checkPass(username, password);
    if (!user) {
        ctx.body = {
            code: '2001',
            msg: '用户名或密码错误',
            data: {}
        }
    } else {
        delete user.password;
        // ctx.session.user = user;

        ctx.body = {
            code: 200,
            msg: '成功',
            data: {
                id: user.id,
                name: user.name,
                type: 'password',
                token: 'token_' + Date.now(),
                time: Date.now()
            }
        }
    }
}

exports.menuListGet = async ctx => {
    const result = await sqlApi.selectMenus()
    return {code: 200, message: '成功', data: {list: result}}

}

exports.categoryTree = async ctx => {
    const result = await categoryAction.getTree()
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
    const rowInfo = { type, name, description, sort, is_menu, parent_id, model_id }
    const now_time = Math.ceil(Date.now() / 1000)
    try {
        if (id) {
            await categoryAction.edit({id }, rowInfo)
        } else {
            await categoryAction.add({ ...rowInfo, create_time: now_time, update_time: now_time })
        }
        ctx.body = {
            code: 200,
            msg: '成功',
            data: {

            }
        }
    } catch (e) {
        console.error(e)
        ctx.body = {
            code: 5001,
            msg: '错误'
        }
    }

}

exports.categoryFind = async ctx => {
    const { id } = ctx.request.body
    const result = await categoryAction.getRow({id})
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
        data: result
    }
} 

// exports.categoryDelete = async ctx => {
//     const { id } = ctx.request.body
//     await sqlApi.deleteCategoryById(id)

//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {}
//     }
// }

exports.categoryUpdate = async ctx => {
    const { id, is_menu, sort } = ctx.request.body
    const rowInfo = {}
    if (is_menu !== undefined) rowInfo.is_menu = is_menu
    if (sort !== undefined) rowInfo.sort = sort
    // await sqlApi.updateCategoryById({id, is_menu, sort})
    await categoryAction.edit({id}, rowInfo)

    ctx.body = {
        code: 200,
        message: '成功',
        data: {}
    }
}

// 获取模型列表
exports.modelsListGet = async ctx => {
    const result = await modelAction.getAll()
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
    const result = await articleAction.getPageList(currentPage, pageSize)
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: result,
            total: 0
        }
    }
}
// // 插入文章
// exports.articleInsert = async ctx => {
//     const data = ctx.request.body
//     const result = await sqlApi.insertArticle(data)
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {}
//     }
// }

// /**
//  * 资源管理
//  */
// // 获取上传列表
// exports.uploadsListGet = async ctx => {
//     const {currentPage, pageSize} = ctx.request.body
//     const [listRes, countRes] = await Promise.all([sqlApi.selectUploads({ currentPage, pageSize }), sqlApi.getUploadsCount()])
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {
//             list: listRes,
//             total: countRes[0].count
//         }
//     }
// }

// 获取资源列表
exports.resourceListGet = async ctx => {
    const {currentPage, pageSize} = ctx.request.body
    const result = await resourceAction.getPageList(currentPage, pageSize)
   
    ctx.body = {
        code: 200,
        message: '成功',
        data: {
            list: result.list,
            total:result.count
        }
    }
}
// // 资源详情
// exports.resourceDetailsGet = async ctx => {
//     const { id } = ctx.request.body
//     const result = await sqlApi.findResourceById(id)
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {
//             details: result[0]
//         }
//     }
// }

// // 更新资源
// exports.resourceDetailsUpdate = async ctx => {
//     const { id, name, status } = ctx.request.body
//     await sqlApi.updateResourceById({ id, name, status })
    
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {}
//     }
// }

// // 获取批量上传列表
// exports.uploadTemporaryGet = async ctx => {
//     const uploadTempPath = path.resolve(__dirname, '../../../upload-temp')
//     const files = getFolderFiles(uploadTempPath)
//     const lock = fs.existsSync(uploadTempPath + '/.lock')
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {
//             list: files,
//             lock
//         }
//     }
// }

// /**
//  * 上传单个文件
//  */
// exports.uploadSingle = async ctx => {
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {
//             filename: ctx.request.file//返回文件名
//         }
//     }
// }

// // 批量上传，需要手动上传文件
// exports.uploadBatch = async ctx  => {
//     const { fileList } = ctx.request.body
    
//     const uploadTempPath = path.resolve(__dirname, '../../../upload-temp')
//     if (fs.existsSync(uploadTempPath + '/.lock')) {
//         ctx.body = {
//             code: 5002,
//             message: '请删除锁定的文件后再上传',
//             data: {}
//         }
//         return
//     }

//     await sqlApi.insertResource(fileList)
//     fs.writeFileSync(uploadTempPath + '/.lock', '')
//     ctx.body = {
//         code: 200,
//         message: '成功',
//         data: {

//         }
//     }
// }