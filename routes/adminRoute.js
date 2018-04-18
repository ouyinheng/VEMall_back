let express = require('express');
let adminDB = require('../db/adminDB');
let route = express.Router();
let myFun = require('./fun');

//登录
route.post('/login',(req,resp)=>{
	var user = req.body
	adminDB.login(user).then((data)=>{
		if(data.length == 0){
			resp.send(false)
		} else {
			resp.send(data[0])
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
route.post('/editUser',(req,resp)=>{
	var param = req.body;
	adminDB.editUserInfo(param).then((data)=>{
		resp.send({bool:true});
	}).catch((error)=>{
		resp.send({bool:false});
	});
});
route.post('/delUser',(req,resp)=>{
	var param = req.body;
	adminDB.delUserInfo(param).then((data)=>{
		resp.send({bool:true});
	}).catch((error)=>{
		resp.send({bool:false});
	});
});
route.post('/addCommodity',(req,resp)=>{
	var param = req.body;
	var url = [];
	url = param.picture;
	adminDB.addCommodity(param).then((data)=>{
		// resp.send(data);
		let id = data.insertId;
		for(let i=0;i<url.length;i++){
			adminDB.addPicture(id,url[i]).then(data=>{
				resp.send(data);
			}).catch();
		}
	}).catch((error)=>{
		
	});
})
//保存上传文件
route.post('/savefile',(req,resp)=>{
	resp.send("哈哈");
})
//查看图片
route.get('/queryImages',(req,resp)=>{
	resp.send("哈哈");
})
//发送邮件
route.post('/findPwd',(req,resp)=>{
	const param = req.body.param;
	const num = myFun.getRandom();//验证码
	var date = new Date();
	const begintime = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
	let endtime = '';
	//是否已经注册过
	adminDB.findEmail({email:param}).then(data=>{
		//是的
		if(data.length > 0){
			resp.send('发送失败,该邮箱已被使用!');
		} else {
			//不是
			adminDB.addEmailAuth({email:param,auth:num,begintime:begintime,endtime:endtime,status:1}).then(data=>{
				myFun.sendMail(param,num);
				const id = data.insertId;
				setTimeout(function(){
					endtime = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
					console.log('验证码失效...',endtime);
					adminDB.loseAuth({id:id,endtime:endtime}).then(data=>{
						console.log(data);
					}).catch()
				},300000)
				resp.send('发送成功!');
			}).catch(error=>{
				console.log(error);
				resp.send('发送失败!');
			})
		}
	}).catch()
})
//查找验证码与邮箱
route.post('/verify',(req,resp)=>{
	const param = req.body;
	adminDB.toVerifyMail(param).then(data=>{
		if(data.length > 0){
			resp.send(true);
		}
	}).catch(error=>{
		resp.send(false);
	})
})
//注册
route.post('/reg',(req,resp)=>{
	const param = req.body;
	adminDB.registerUser(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		resp.send(false);
	})
})
module.exports = route;