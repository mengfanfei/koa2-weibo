/**
 * @description blog services
 * @author mengfanfei
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 创建微博
 * @param {Object} param0 {userId, content, image}
 */
async function createBlog({userId, content, image}) {
    const result = Blog.create({userId, content, image})
    return result
}

/**
 * 根据用户获取博客列表
 * @param {Object} param0 {userName, pageIndex = 0, pageSize = 10}
 */
async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
    // 拼接查询条件
    const whereOpts = {}
    if (userName) {
        whereOpts.userName = userName
    }
    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize*pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: whereOpts,
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}