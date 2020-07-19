/**
 * @description 数据格式化
 */
const { DEAULT_PICTURE } = require('../conf/constant')

 function _formatUserPicture(obj) {
     if (obj.picture == null) {
         obj.picture = DEAULT_PICTURE
     }
     return obj
 }


 /**
  * 格式化用户信息
  * @param {Array|Object} list 用户列表或者单个用户信息
  */
 function formatUser(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // shuzu yonghuleibiao
        return list.map(_formatUserPicture)
    }
    //dangeduixiang
    return _formatUserPicture(list)
 }
 module.exports = {
     formatUser
 }