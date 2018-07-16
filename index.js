const express=require('express')
const cookieParser=require('cookie-parser')
const cookieSession=require('cookie-session')
const bodyParser=require('body-parser')
const multer=require('multer')
const route=require('./routes')

var app = express()

// 设置模板引擎
app.set('views', './views')
app.set('view engine', 'ejs')

// 设置网站的静态根目录
app.use(express.static('./public'))

// 设置cookie和session
var sessionArr=[];
for ( var i=0; i < 10000; i++) {
	sessionArr.push('keys_'+Math.random())
}
app.use(cookieParser('abcde'))
app.use(cookieSession({name:'session_id', keys: sessionArr, maxAge: 20*60*1000}))

// 设置数据和文件处理的中间件 
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer({dest:'./public/upload'}).any())

// 处理路由
route(app)

var server = app.listen(3000, function(){
	console.log('server is running at %s', server.address().port);
})



