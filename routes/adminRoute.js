let express = require('express');
let adminDB = require('../db/adminDB');
let route = express.Router();

route.get('/queryImages',(req,resp)=>{

});

route.post('/login',(req,resp)=>{
	var user = req.body
	adminDB.login(user).then((data)=>{
		if(data.length == 0){
			resp.send("false")
		} else {
			resp.send({bool:true,data:data[0]})
		}
	}).catch((error)=>{
		resp.send(error)
	})
})
//查询所有用户
route.post('/findAll',(req,resp)=>{
	/*resp.writeHead(200,'ok',{
		"Content-Type":"text/plain;charset=utf-8",
		"Access-Control-Allow-Origin":"*",
		"Access-Control-Allow-Headers": "*"
	})*/
	adminDB.findAll().then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/addCommodity',(req,resp)=>{
	var param = req.body;
	var url = [];
	url = param.picture;
	/*for(let i=0;i<param.picture.length;i++){
		url = url==''? param.picture[i]:url+";"+param.picture[i];
	}*/
	adminDB.addCommodity(param).then((data)=>{
		// resp.send(data);
		let id = data.insertId;
		for(let i=0;i<url.length;i++){
			adminDB.addPicture(id,url[i]).then(data=>{
				resp.send(data);
			}).catch();
		}
	}).catch((error)=>{
		console.log(error);
	});
})
//保存上传文件
route.post('/savefile',(req,resp)=>{
	resp.send("哈哈");
})
route.get('/queryImages',(req,resp)=>{
	resp.send("哈哈");
})

module.exports = route;