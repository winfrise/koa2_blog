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
    await ctx.render(`index/${template}/article/list`, { template, menus:menusTree })
}

exports.articleDetails = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)
    await ctx.render(`index/${template}/article/details`, { template, menus:menusTree })
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