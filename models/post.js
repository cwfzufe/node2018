const dbPool = require('../lib/util').dbPool

module.exports = {
	createPost: function createPost(post, callback) {
		dbPool.query('INSERT INTO tb_post2 SET ?', post, function (err, results, fields) {
			if (err) {
				callback({ ok: false, msg: 'database error: ' + err.sqlMessage })
			} else {
				if (results.affectedRows != 1) {
					callback({ ok: false, msg: 'create post failed' })
				} else {
					callback({ ok: true })
				}
			}
		})
	},

	queryPosts: function queryPosts(callback) {
		dbPool.query('SELECT tb_post2.*, tb_user2.avatar, (SELECT COUNT(*) FROM tb_comment2 WHERE postId = tb_post2.Id) AS commentCount FROM tb_post2 JOIN tb_user2 ON tb_post2.author = tb_user2.username ORDER BY posttime DESC', function (err, results, fields) {
			if (err) {
				callback({ ok: false, msg: 'database error: ' + err.sqlMessage })
			} else {
				callback({ ok: true, data: results })
			}
		})
	},

	queryPostsByAuthor: function queryPostsByAuthor(author, callback) {
		dbPool.query('SELECT tb_post2.*, tb_user2.avatar, (SELECT COUNT(*) FROM tb_comment2 WHERE postId = tb_post2.Id) AS commentCount FROM tb_post2 JOIN tb_user2 ON tb_post2.author = tb_user2.username WHERE tb_post2.author=? ORDER BY posttime DESC', [author], function (err, results, fields) {
			if (err) {
				callback({ ok: false, msg: 'database error: ' + err.sqlMessage })
			} else {
				callback({ ok: true, data: results })
			}
		})
	},

	queryPostById: function queryPostById(id, callback) {
		dbPool.query('SELECT tb_post2.*, tb_user2.avatar, (SELECT COUNT(*) FROM tb_comment2 WHERE postId = tb_post2.Id) AS commentCount FROM tb_post2 JOIN tb_user2 ON tb_post2.author = tb_user2.username WHERE tb_post2.Id=? ORDER BY posttime DESC', [id], function (err, results, fields) {
			if (err) {
				callback({ ok: false, msg: 'database error: ' + err.sqlMessage })
			} else {
				callback({ ok: true, data: results })
			}
		})
	},

	queryPostByIdAddPv: function queryPostByIdAddPv(id, callback) {
		dbPool.getConnection(function(err, connection){
			connection.beginTransaction(function (err) {
				if (err) { throw err; }
				connection.query('UPDATE tb_post2 SET pv=pv+1 WHERE Id=?', [id], function (error, results, fields) {
					if (error) {
						return connection.rollback(function () {
							throw error;
						});
					}
					connection.query('SELECT tb_post2.*, tb_user2.avatar, (SELECT COUNT(*) FROM tb_comment2 WHERE postId = tb_post2.Id) AS commentCount FROM tb_post2 JOIN tb_user2 ON tb_post2.author = tb_user2.username WHERE tb_post2.Id=? ORDER BY posttime DESC', [id], function (error, results, fields) {
						if (error) {
							return connection.rollback(function () {
								throw error;
							});
						}
						connection.commit(function (err) {
							if (err) {
								return connection.rollback(function () {
									throw err;
								});
							}
							callback({ok: true, data: results})
							connection.release()
						});
					});
				});
			});
		})		
	}
}