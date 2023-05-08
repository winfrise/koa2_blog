const Router = require('koa-router');
const router = new Router({ prefix: '/api' })

const ApiController = require('../../controller/api/index.js')

router.post('/login', ApiController.login)

router.post('/category/list/get', ApiController.categoryListGet)
router.post('/category/add', ApiController.categoryAdd)
router.post('/category/find', ApiController.categoryFind)

router.post('/models/list/get', ApiController.modelsListGet)

router.post('/article/list/get', ApiController.articleListGet)
router.post('/article/insert', ApiController.articleInsert)

/**
 * 资源管理
 */
router.post('/resource/list/get', ApiController.resourceListGet)

module.exports = router