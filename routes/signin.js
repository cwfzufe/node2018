const express=require('express')
const userModel = require('../models/user')
const checkNotLogin = require('../middlewares/check').checkNotLogin

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', checkNotLogin, function(req, res){
	res.render('signin')
})

router.post('/', checkNotLogin, function(req, res){
	const username = req.body.inputEmail
	const password = req.body.inputPassword
	
	// 根据用户输入信息查询数据库
	let user = {
		username: username,
		password: password
	}
	
	userModel.queryUser(user, function(jsonRes) {
		if (jsonRes.ok) {
			if (jsonRes.data.length<1) {
				res.send('<script>alert("登录失败！用户不存在");location="/signin";</script>')
			} else {
				if (jsonRes.data[0].password != user.password) {
					res.send('<script>alert("登录失败！用户或密码错误");location="/signin";</script>')
				} else {
					delete jsonRes.data[0].password
					req.session.user = jsonRes.data[0]
					res.send('<script>alert("登录成功！");location="/posts";</script>')
				}
			}
		} else {				
			res.send('<script>alert("登录失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>')			
		}
	})		
})

module.exports=router
