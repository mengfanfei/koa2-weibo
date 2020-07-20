/**
 * @description weibo api 路由
 * @author mengfanfei
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const { create, getBlogList } = require('../../controller/blog')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')

const router = require('koa-router')()

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({userId, content, image})
})

// 获取微博列表
router.post('/getBlogList', loginCheck, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    const { pageIndex, pageSize } = ctx.request.body
    ctx.body = await getBlogList(userName, pageIndex, pageSize)
})


module.exports = router