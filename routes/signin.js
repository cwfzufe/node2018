const express=require('express')

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', function(req, res){
	res.send('登录页面')
})

router.post('/', function(req, res){
	res.send('登录功能的实现')
})

module.exports=router
