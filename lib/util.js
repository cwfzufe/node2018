const mysql = require('mysql')
const pathLib = require('path')
const fs = require('fs')

module.exports = {
	dbPool : mysql.createPool({
		connectionLimit : 10,
		host     : 'www.mycourse.top',
		user     : 'cwf',
		password : '123456',
		database : 'myblog'
	}),
	
	renameUploadFile : function(fileObj) {
		var newFileName = fileObj.path + pathLib.parse(fileObj.originalname).ext;
		fs.rename(fileObj.path, newFileName, function(err){
			if (err){
				console.log(err)
			}
		})
		return newFileName
	}
}