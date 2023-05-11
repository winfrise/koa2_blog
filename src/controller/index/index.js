const dayjs = require('dayjs')
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

    let pageSize = 10
    let currentPage = 1
    const { id, page_size, current_page } = ctx.request.query
    page_size && (pageSize = page_size)
    current_page && (currentPage = current_page)


    const result = await sqlApi.selectChildCategoryById({page_size: pageSize, current_page: currentPage, id})
    await ctx.render(`index/${template}/category/list`, { template, menus:menusTree, list: result })
}

exports.articleList = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)

    let currentPage = 1
    let pageSize = 10
    const { id, page_size, current_page } = ctx.request.query

    if (current_page) currentPage = current_page
    if (page_size) pageSize = page_size

    let list = await sqlApi.selectArticles({ category_id: id, currentPage, pageSize })
    list = list.map(item => {
        return { ...item, time: dayjs(item.update_time * 1000 || item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
    })
    await ctx.render(`index/${template}/article/list`, { template, menus:menusTree, list: list })
}

exports.articleDetails = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menusTree = arrayToTree(menus, 0)

    const {id} = ctx.request.query
    const result = await sqlApi.findArticleById(id)
    await ctx.render(`index/${template}/article/details`, { template, menus:menusTree, info:result[0] })
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