const sqlApi = require('../../lib/db-utils')
const arrayToTree = require('../../plugins/arrayToTree.js')

const templates = ['default', 'college']
const template = templates[1]


exports.home = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/home/index`, { template, menus:menusTree })
}

exports.categoryList = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/category/list`, { template, menus:menusTree })
}

exports.articleList = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)

    let currentPage = 1
    let pageSize = 10
    const { id, page_size, current_page } = ctx.request.query

    if (current_page) currentPage = current_page
    if (page_size) pageSize = page_size

    const list = await sqlApi.selectArticles({ category_id: id, currentPage , pageSize})
    await ctx.render(`index/${template}/article/list`, { template, menus:menusTree, list: list })
}

exports.articleDetails = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/article/details`, { template, menus:menusTree })
}

exports.pageIndex = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/page/index`, { template, menus:menusTree })
}

exports.uploadsList = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/uploads/list`, { template, menus:menusTree })
}

exports.uploadsDetails = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/uploads/details`, { template, menus:menusTree })
}

/**
 * 资源页
 */
exports.resourceList = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/resource/list`, { template, menus:menusTree })
}
exports.resourceDetails = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/resource/details`, { template, menus:menusTree })
}