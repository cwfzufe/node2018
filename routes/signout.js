const express=require('express')
const checkLogin = require('../middlewares/check').checkLogin

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', checkLogin, function(req, res){
	req.session.user = null
	res.redirect('/posts')
})


module.exports=router
