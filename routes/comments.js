const express=require('express')

const router = express.Router()

// 业务逻辑代码：接口
router.post('/',  function(req, res){
	res.send('发表评论功能的实现')
})


router.get('/:commentId/remove',  function(req, res){
	res.send('删除评论'+req.params.commentId)
})

module.exports=router
