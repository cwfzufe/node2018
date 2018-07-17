const dbPool = require('../lib/util').dbPool

module.exports = {
	createPost : function createPost(post, callback) {
		dbPool.query('INSERT INTO tb_post2 SET ?', post, function(err, results, fields) {
			if (err) {
				callback({ok: false, msg: 'database error: '+err.sqlMessage})
			} else {
				if (results.affectedRows != 1) {			
					callback({ok: false, msg: 'create post failed'})
				} else {
					callback({ok: true})
				}
			}
		})
	}
}