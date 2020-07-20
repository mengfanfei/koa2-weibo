/**
 * @description weibo 数据模型
 * @author mengfanfei
 */


const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片'
    }
})

module.exports = Blog