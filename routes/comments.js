const express=require('express')
const checkLogin = require('../middlewares/check').checkLogin
const commentModel = require('../models/comment')

const router = express.Router()

// 业务逻辑代码：接口
router.post('/', checkLogin, function(req, res){
	const content = req.body.comment
	const postId = req.body.postid
	// 将信息写入数据库
	let comment = {
		content: content,
		postId: postId,
		author: req.session.user.username
	}
	
	commentModel.createComment(comment, function(jsonRes) {
		if (jsonRes.ok) {
			res.send(`<script>alert("评论成功！");location="/posts/${postId}"</script>`)
		} else {				
			res.send('<script>alert("发表失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>')		
		}
	})	
})


router.get('/:commentId/remove',  function(req, res){
	commentModel.queryCommentById(req.params.commentId, function(jsonRes){
		if (jsonRes.data[0].author != req.session.user.username) {
			//权限不足
		} else {
			commentModel.deleteCommentById(req.params.commentId, function(jsonRes) {
				if (err) {
					
				} else {
					
				}					 
			})
		}		
	})
	
})

module.exports=router
