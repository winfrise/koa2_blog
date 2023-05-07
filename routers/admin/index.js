const Router = require('koa-router');
const router = new Router({ prefix: '/admin' })

// 登录页
router.get('/login', async ctx => {
    await ctx.render('admin/login')
})


router.get('/index', async ctx => {
    await ctx.render('admin/index', {})
})
router.get('/welcome', async ctx => {
    await ctx.render('admin/welcome', {})
})
// 栏目列表接口
router.get('/category/list', async ctx => {
    await ctx.render('admin/category/list', {})
})

// 添加新栏目
router.get('/category/add', async ctx => {
    await ctx.render('admin/category/add', {})
})

// 获取文章列表
router.get('/article/list', async ctx => {
    await ctx.render('admin/article/list', {})
})

router.get('/article/add', async ctx => {
    await ctx.render('admin/article/add', {})
})

module.exports = router