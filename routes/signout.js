const express=require('express')
const checkLogin = require('../middlewares/check').checkNotLogin

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', checkLogin, function(req, res){
	delete req.session.user
	res.redirect('/posts')
})


module.exports=router
