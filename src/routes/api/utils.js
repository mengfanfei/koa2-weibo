/**
 * @description utils api 路由
 * @author mengfanfei
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const koaFrom = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

 const router = require('koa-router')()
 router.prefix('/api/utils')

 // 上传图片
 router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file
    ctx.body = await saveFile({name, type, size, filePath: path})
 })

 module.exports = router