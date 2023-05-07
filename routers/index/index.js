const Router = require('koa-router');
const router = new Router()

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

module.exports = router