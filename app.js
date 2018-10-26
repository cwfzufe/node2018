const express=require('express');
const bodyParser=require('body-parser');

var server=express();

// 设置网站的静态根目录
server.use(express.static('./public'))
server.use(bodyParser.urlencoded({extended:true}))
// 链式操作
server.use('/', function(req,res,next){
    var jsonData = {}
    jsonData["GET"] = req.query
    jsonData["POST"] = req.body
    res.send(jsonData)
});


server.listen(9999);