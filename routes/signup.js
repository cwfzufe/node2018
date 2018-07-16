const express=require('express')
const userModel = require('../models/user')
const util = require('../lib/util')

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', function(req, res){
	res.render('signup')
})

router.post('/', function(req, res){
	const username = req.body.inputEmail
	const password = req.body.inputPassword
	const gender = req.body.gender
	const bio = req.body.introduce	
	const avatar = util.renameUploadFile(req.files[0])
	
	// 将信息写入数据库
	let user = {
		username: username,
		password: password,
		avatar: avatar,
		gender: gender,
		bio: bio
	}
	
	userModel.createUser(user, function(jsonRes) {
		if (jsonRes.ok) {
			res.send('<script>alert("注册成功！");location="/signin"</script>')
		} else {				
			res.send('<script>alert("注册失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>')			
		}
	})		
})

module.exports=router
