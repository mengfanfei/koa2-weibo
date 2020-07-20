/**
 * @description blog services
 * @author mengfanfei
 */

const { Blog } = require('../db/model/index')


/**
 * 创建微博
 * @param {Object} param0 {userId, content, image}
 */
async function createBlog({userId, content, image}) {
    const result = Blog.create({userId, content, image})
    return result
}

module.exports = {
    createBlog
}