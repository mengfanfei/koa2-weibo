/**
 * @description blog controller
 * @author mengfanfei
 */


const { createBlog, getBlogListByUser } = require("../services/blog")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { createBlogFailInfo } = require("../model/ErrorInfo")
const xss = require('xss')


 /**
  * 创建微博
  * @param {Object} param0 {userId, content, image}
  */
async function create({userId, content, image}) {
    try {
        const blog = await createBlog({userId, content: xss(content), image})
        return new SuccessModel(blog)
    } catch (error) {
        console.error(error.message, error.stack)
        return new ErrorModel(createBlogFailInfo)
    }
    
}

/**
 * 获取博客列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 页数
 * @param {number} pageSize 条数
 */
async function getBlogList(userName, pageIndex = 0, pageSize = 10) {
    const result = await getBlogListByUser(userName, pageIndex, pageSize)
    return new SuccessModel(result)
}

module.exports = {
    create,
    getBlogList
}