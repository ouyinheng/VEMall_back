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
			let token = myFun.getRandom();
			data[0].token = token;
			let userInfo = data[0];
			adminDB.updateToken({token:token,id:data[0].id}).then(data=>{
				resp.send(userInfo);
			}).catch(error=>{
				resp.status(500).send(false);
			})
		}
	}).catch((error)=>{
		resp.send(error)
	})
})
route.post('/logout',(req,resp)=>{
	var user = JSON.parse(req.body.user);
	adminDB.updateToken({token:0,id:user.id}).then(data=>{
		// adminDB.addInfo({user:user,time:new Date().toLocaleString(),op:'logout'})
		resp.send(true);
	}).catch(error=>{
		resp.status(500).send(false);
	})
})
//登录
route.post('/adminLogin',(req,resp)=>{
	var user = req.body
	let ip = myFun.getClientIp(req).slice(7,myFun.getClientIp(req).length) || '';
	adminDB.adminLogin(user).then((data)=>{
		if(data.length == 0){
			resp.send(false)
		} else {
			adminDB.addInfo({user:data[0],time:new Date().toLocaleString(),op:'login',place:user.place,ip:ip})
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
//修改
route.post('/editUser',(req,resp)=>{
	var param = req.body;
	if(param.status){
		param.status = 1
	} else {
		param.status = 0;
	}
	console.log(param);
	adminDB.editUserInfo(param).then((data)=>{
		console.log(data);
		resp.send({bool:true});
	}).catch((error)=>{
		resp.send({bool:false});
	});
});
//删除
route.post('/delUser',(req,resp)=>{
	var param = req.body;
	adminDB.delUserInfo(param).then((data)=>{
		resp.send({bool:true});
	}).catch((error)=>{
		resp.send({bool:false});
	});
});


function getimg(data){
	return new Promise((resolve,reject)=>{
		let sendData = data;
		for(let i=0;i<data.length;i++){
			var picture = [];
			adminDB.getComImg({id:data[i].id}).then(data=>{
				picture = data
				sendData[i].picture = picture;
				resolve(sendData);
			}).catch(error=>{
				console.log(error);
			})
		}
	})
}

route.post('/getCom',(req,resp)=>{
	var param = req.body;
	adminDB.getCom(param).then((data)=>{
		// resp.send(data);
		let sendData = data;
		let k=0;
		for(let i=0;i<sendData.length;i++){
			let picture = [];
			adminDB.getComImg({id:data[i].id}).then(data=>{
				k++;
				picture = data
				sendData[i].picture = picture;
				if(k==sendData.length){
					resp.send(sendData);
				}
			}).catch(error=>{
				console.log(error);
			})
		}
	}).catch((error)=>{
		console.log(error);
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
//读取文件目录文件
route.post('/getFiles',(req,resp)=>{
	const folder = req.body.param;
	myFun.getFiles(folder).then(data=>{
		resp.send(data);
	}).catch()
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
						// console.log(data);
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
//发送邮件
route.post('/forgetPwd',(req,resp)=>{
	const param = req.body.param;
	const num = myFun.getRandom();//验证码
	var date = new Date();
	const begintime = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
	let endtime = '';
	//不是
	adminDB.addEmailAuth({email:param,auth:num,begintime:begintime,endtime:endtime,status:1}).then(data=>{
		myFun.findPwd(param,num);
		const id = data.insertId;
		setTimeout(function(){
			endtime = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
			console.log('验证码失效...',endtime);
			adminDB.loseAuth({id:id,endtime:endtime}).then(data=>{
				// console.log(data);
			}).catch()
		},300000)
		resp.send('发送成功!');
	}).catch(error=>{
		console.log(error);
		resp.send('发送失败!');
	})
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
//添加收货地址
route.post('/addUserInfo',(req,resp)=>{
	const param = req.body;
	adminDB.addUserInfo(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		resp.send(false);
	})
})
//获取收货地址
route.post('/getUserInfo',(req,resp)=>{
	const param = req.body;
	adminDB.getUserInfo(param).then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//获取商品收货地址
route.post('/getUserSite',(req,resp)=>{
	const param = req.body;
	adminDB.getUserSite(param).then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//修改收货地址
route.post('/editUserSite',(req,resp)=>{
	const param = req.body;
	adminDB.editUserSite(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//添加订单
route.post('/addUserOrder',(req,resp)=>{
	const param = req.body;
	adminDB.addUserOrder(param).then(data=>{
		let id = data.insertId;
		setTimeout(function(){
			setTimeout(()=>{
				adminDB.queryUserOrder({orderId:id}).then(data=>{
					console.log(data)
					if(data.status == 0){
						adminDB.editUserOrder({obj:'status',data:10,id:id}).then(data=>{
							console.log(data)
						}).catch(error=>{
							console.log(data);
						})
					}
				}).catch()
			},86400000)
			resp.send(true);
		},1000)
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//查询订单
route.post('/queryUserOrder',(req,resp)=>{
	const param = req.body;
	adminDB.queryUserOrder(param).then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//删除订单
route.post('/delUserOrder',(req,resp)=>{
	const param = req.body;
	adminDB.delUserOrder(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//修改订单
route.post('/editUserOrder',(req,resp)=>{
	const param = req.body;
	adminDB.editUserOrder(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})

//修改用户头像
route.post('/editUserIcon',(req,resp)=>{
	const param = req.body;
	adminDB.editUserIcon(param).then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
route.post('/getlog',(req,resp)=>{
	adminDB.getAllLog().then(data=>{
		resp.send(data);
	}).catch()
})
module.exports = route;