const express=require('express')

const router = express.Router()

// 业务逻辑代码：接口
router.get('/', function(req, res){
	if (req.query['author'] != null) {
		res.send('这是'+req.query['author']+'的个人页面')
	} else {
		res.send('首页')
	}
})


router.get('/create',  function(req, res){
	res.send('发表文章页面')
})

router.post('/create',  function(req, res){
	res.send('发表文章功能的实现')
})


router.get('/:postId', function(req, res){
	res.send('文章页面'+req.params.postId)
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
