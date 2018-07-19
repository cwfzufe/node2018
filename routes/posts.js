const express=require('express')
const postModel = require('../models/post')
const commentModel = require('../models/comment')
const checkLogin = require('../middlewares/check').checkLogin

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', function(req, res){
	if (req.query['author'] != null) {
		postModel.queryPostsByAuthor(req.query['author'], function(jsonRes){
			if (jsonRes.ok) {
				res.render('posts', {posts: jsonRes.data})
			} else {
				'<script>alert("查询失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>'
			}			
		})
	} else {
		postModel.queryPosts(function(jsonRes){
			if (jsonRes.ok) {
				res.render('posts', {posts: jsonRes.data})
			} else {
				'<script>alert("查询失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>'
			}			
		})
	}
})


router.get('/create', checkLogin, function(req, res){
	res.render('newpost')
})

router.post('/create', checkLogin, function(req, res){
	const title = req.body.postTitle
	const content = req.body.postContent	
	// 将信息写入数据库
	let post = {
		title: title,
		content: content,
		author: req.session.user.username
	}
	
	postModel.createPost(post, function(jsonRes) {
		if (jsonRes.ok) {
			res.send('<script>alert("发表成功！");location="/posts"</script>')
		} else {				
			res.send('<script>alert("发表失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>')		
		}
	})	
})


router.get('/:postId', function(req, res){
	postModel.queryPostByIdAddPv(req.params.postId, function(jsonRes){
		commentModel.queryCommentsByPostId(req.params.postId, function(jsonResComment){
			console.log(jsonRes.data.length)
			if (jsonRes.ok && jsonRes.data.length == 1) {
				res.render('post', {post: jsonRes.data[0], comments: jsonResComment.data})
			} else {
				res.send('<script>alert("查询失败。'+jsonRes.msg+'");location="javascript:history.go(-1)";</script>')
			}	
		})				
	})
})


router.get('/:postId/edit',  function(req, res){
	res.send('修改文章页面'+req.params.postId)
})

router.post('/:postId/edit',  function(req, res){
	res.send('修改文章功能的实现')
})


router.get('/:postId/remove',  function(req, res){
	res.send('删除文章功能的实现'+req.params.postId)
})


module.exports=router
