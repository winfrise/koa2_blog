const Router = require('koa-router');
const router = new Router()

const sqlApi = require('../../lib/db-utils')

const template = 'default'

router.get('/', async ctx => {
    ctx.redirect('/home')
})

router.get('/home', async ctx => {
    const menus = await sqlApi.selectMenus()
    await ctx.render(`index/${template}/home/index`, { menus })
})

router.get('/category/list', async ctx => {
    await ctx.render(`index/${template}/category/list`)
})

router.get('/article/list', async ctx => {
    await ctx.render(`index/${template}/article/list`)
})

router.get('/article/details', async ctx => {
    await ctx.render(`index/${template}/article/details`)
})

router.get('/uploads/list', async ctx => {
    await ctx.render(`index/${template}/uploads/list`)
})
router.get('/uploads/details', async ctx => {
    await ctx.render(`index/${template}/uploads/details`)
})

/**
 * 资源页
 */
router.get('/resource/list', async ctx => {
    await ctx.render(`index/${template}/resource/list`)
})
router.get('/resource/details', async ctx => {
    await ctx.render(`index/${template}/resource/details`)
})
module.exports = router