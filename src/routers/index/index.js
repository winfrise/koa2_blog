const Router = require('koa-router');
const router = new Router()

const sqlApi = require('../../lib/db-utils')

let menus 
sqlApi.selectMenus().then(res => {
    menus = res
})

const templates = ['default', 'college']
const template = templates[1]

router.get('/', async ctx => {
    ctx.redirect('/home')
})

router.get('/home', async ctx => {
    await ctx.render(`index/${template}/home/index`, { template, menus })
})

router.get('/category/list', async ctx => {
    await ctx.render(`index/${template}/category/list`, { template, menus })
})

router.get('/article/list', async ctx => {
    await ctx.render(`index/${template}/article/list`, { template, menus })
})

router.get('/article/details', async ctx => {
    await ctx.render(`index/${template}/article/details`, { template, menus })
})

router.get('/uploads/list', async ctx => {
    await ctx.render(`index/${template}/uploads/list`, { template, menus })
})
router.get('/uploads/details', async ctx => {
    await ctx.render(`index/${template}/uploads/details`, { template, menus })
})

/**
 * 资源页
 */
router.get('/resource/list', async ctx => {
    await ctx.render(`index/${template}/resource/list`, { template, menus })
})
router.get('/resource/details', async ctx => {
    await ctx.render(`index/${template}/resource/details`, { template, menus })
})
module.exports = router