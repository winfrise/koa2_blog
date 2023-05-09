const Router = require('koa-router');
const router = new Router({ prefix: '/api' })
const upload = require('../../lib/upload.js')

const ApiController = require('../../controller/api/index.js')

router.post('/login', ApiController.login)

router.post('/category/list/get', ApiController.categoryListGet)
router.post('/category/add', ApiController.categoryAdd)
router.post('/category/find', ApiController.categoryFind)

router.post('/models/list/get', ApiController.modelsListGet)

router.post('/article/list/get', ApiController.articleListGet)
router.post('/article/insert', ApiController.articleInsert)

router.post('/uploads/list/get', ApiController.uploadsListGet)
/**
 * 资源管理
 */
router.post('/resource/list/get', ApiController.resourceListGet)
router.post('/resource/details/get', ApiController.resourceDetailsGet)
router.post('/resource/details/update', ApiController.resourceDetailsUpdate)

/**
 * 上传
 */
router.post('/upload/single', upload.single('file'),ApiController.uploadSingle);
router.post('/upload/batch', ApiController.uploadBatch);
router.post('/upload/temporary/get', ApiController.uploadTemporaryGet)

module.exports = router