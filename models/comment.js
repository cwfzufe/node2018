const dbPool = require('../lib/util').dbPool

module.exports = {
	createComment: function createComment(comment, callback) {
		dbPool.query('INSERT INTO tb_comment2 SET ?', comment, function (err, results, fields) {
			if (err) {
				callback({ ok: false, msg: 'database error: ' + err.sqlMessage })
			} else {
				if (results.affectedRows != 1) {
					callback({ ok: false, msg: 'create comment failed' })
				} else {
					callback({ ok: true })
				}
			}
		})
	},
	
	queryCommentsByPostId :function queryCommentsByPostId(postId, callback) {
		dbPool.query('SELECT tb_comment2.*, tb_user2.avatar FROM tb_comment2 JOIN tb_user2 ON tb_comment2.author = tb_user2.username WHERE tb_comment2.postId=? ORDER BY commentTime DESC', [postId], function (err, results, fields) {
			if (err) {
				callback({ ok: false, msg: 'database error: ' + err.sqlMessage })
			} else {
				callback({ ok: true, data: results })
			}
		})
	}
}
