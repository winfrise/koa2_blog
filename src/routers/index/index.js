const Router = require('koa-router');
const router = new Router()

router.get('/', async ctx => {
    ctx.redirect('/home')
})

router.get('/home', async ctx => {
    await ctx.render('index/home/index')
})

router.get('/category/list', async ctx => {
    await ctx.render('index/category/list')
})

router.get('/article/list', async ctx => {
    await ctx.render('index/article/list')
})

router.get('/article/details', async ctx => {
    await ctx.render('index/article/details')
})

router.get('/uploads/list', async ctx => {
    await ctx.render('index/uploads/list')
})
router.get('/uploads/details', async ctx => {
    await ctx.render('index/uploads/details')
})

/**
 * 资源页
 */
router.get('/resource/list', async ctx => {
    await ctx.render('index/resource/list')
})
router.get('/resource/details', async ctx => {
    await ctx.render('index/resource/details')
})
module.exports = router