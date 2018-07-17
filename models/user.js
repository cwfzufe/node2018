const dbPool = require('../lib/util').dbPool

module.exports = {
	createUser : function createUser(user, callback) {
		dbPool.query('INSERT INTO tb_user2 SET ?', user, function(err, results, fields) {
			if (err) {
				callback({ok: false, msg: 'database error: '+err.sqlMessage})
			} else {
				if (results.affectedRows != 1) {			
					callback({ok: false, msg: 'create user failed'})
				} else {
					callback({ok: true})
				}
			}
		})
	},
	
	queryUser: function queryUser(user, callback) {
		dbPool.query('SELECT * FROM tb_user2 WHERE username=?', [user.username], function(err, results, fields){
			if (err) {
				callback({ok: false, msg: 'database error: ' + err.sqlMessage})
			} else {
				callback({ok: true, data: results})
			}
		})
	}
}