let express = require('express');
let subjectDB = require('../db/subjectDB');
let route = express.Router();

route.get('/queryImages',(req,resp)=>{

});
//查询所有用户
route.post('/findAll',(req,resp)=>{
	/*resp.writeHead(200,'ok',{
		"Content-Type":"text/plain;charset=utf-8",
		"Access-Control-Allow-Origin":"*",
		"Access-Control-Allow-Headers": "*"
	})*/
	subjectDB.findAll().then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/login',(req,resp)=>{
	var user = req.body
	subjectDB.login(user).then((data)=>{
		if(data.length == 0){
			resp.send("false")
		} else {
			resp.send({bool:true,data:data[0]})
		}
	}).catch((error)=>{
		resp.send(error)
	})
})
//保存上传文件
route.post('/savefile',(req,resp)=>{
	resp.send("哈哈");
})
route.get('/queryImages',(req,resp)=>{
	resp.send("哈哈");
})

module.exports = route;