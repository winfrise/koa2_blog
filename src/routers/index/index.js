const Router = require('koa-router');
const router = new Router()

const IndexController = require('../../controller/index/index.js')

router.get('/', async ctx => {
    ctx.redirect('/home')
})

router.get('/home', IndexController.home)

router.get('/category/list', IndexController.categoryList)

router.get('/article/list', IndexController.articleList)

router.get('/article/details', IndexController.articleDetails)

router.get('/page/index', IndexController.pageIndex)

router.get('/uploads/list', IndexController.uploadsList)
router.get('/uploads/details', IndexController.uploadsDetails)

/**
 * 资源页
 */
router.get('/resource/list', IndexController.resourceList)
router.get('/resource/details', IndexController.resourceDetails)

module.exports = router