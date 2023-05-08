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

router.post('/resource/upload-before/get', ApiController.uploadBeforeGet)

/**
 * 上传
 */
router.post('/upload/single', upload.single('file'),ApiController.uploadSingle);
router.post('/upload/resource/batch',ApiController.uploadBatch);

module.exports = router