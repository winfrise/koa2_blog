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
    const menus_tree = arrayToTree(menus, 0)

    const { id, page_size = 10, current_page = 1 } = ctx.request.query

    // 当前分类信息
    const [current_category] = await sqlApi.findCategoryById(id)

    // 子类
    const child_categories = await sqlApi.selectChildCategoryByParentId({ page_size, current_page, parent_id: id })
    
    // 所有文章
    const articles = await sqlApi.selectArticleByCategoryIds({ page_size, current_page, category_ids: [...child_categories.map(item => item.id)] })
    await ctx.render(`index/${template}/category/list`, { template, menus: menus_tree, child_categories, articles, current_category })
}
/**
 * 文单列表
 * @param {*} ctx.query.id 文章分类列表
 * @param {*} ctx.query.page_size 每页显示数量
 * @param {*} ctx.query.current_page 当前页码
 */
exports.articleList = async ctx => {
    const menus = await sqlApi.selectMenus()
    const menus_tree = arrayToTree(menus, 0)

    let { id, page_size = 10, current_page = 1 } = ctx.request.query

    // 当前分类下的文章列表
    let list = await sqlApi.selectArticles({ category_id: id, current_page, page_size })
    list = list.map(item => {
        return { ...item, time: dayjs(item.update_time * 1000 || item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
    })

    // 当前分类的兄弟分类
    const [current_category] = await sqlApi.findCategoryById(id)
    const sibling_categories = await sqlApi.selectChildCategoryByParentId({ parent_id: current_category.parent_id})

    await ctx.render(`index/${template}/article/list`, { template, menus: menus_tree, list: list, sibling_categories, current_category })
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

    const {id}= ctx.request.query

    const result = await sqlApi.selectArticles({page_size: 1, current_page: 1, category_id:id})
    await ctx.render(`index/${template}/page/index`, { template, menus:menusTree,  info: result[0]})
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