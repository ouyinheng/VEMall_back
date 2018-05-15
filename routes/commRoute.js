let express = require('express');
let massDB = require('../db/commDB');
let adminDB = require('../db/adminDB');
let route = express.Router();
let myFun = require('./fun');
//添加商品
route.post('/addCommodity',(req,resp)=>{
	var param = req.body;
	param.user = JSON.parse(param.user);
	let ip = myFun.getClientIp(req).slice(7,myFun.getClientIp(req).length) || '';
	adminDB.addInfo({user:param.user,time:new Date().toLocaleString(),op:'添加商品',place:param.place,ip:ip})
	var url = [];
	url = param.picture;
	massDB.addCommodity(param).then((data)=>{
		let id = data.insertId;
		for(let i=0;i<url.length;i++){
			massDB.addPicture(id,url[i]).then(data=>{
				resp.send(data);
			}).catch();
		}
	}).catch((error)=>{
		console.log(error);
	});
})

//修改商品
route.post('/editCommodity',(req,resp)=>{
	const param = req.body;
	massDB.editCommodity(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		console.log(error);
	})
})
//查询商品
route.post('/queryCommodity',(req,resp)=>{
	const param = req.body;
	massDB.queryCommodity(param).then(data=>{
		let sendData = data;
		let k=0;
		for(let i=0;i<sendData.length;i++){
			let picture = [];
			massDB.getComImg({id:data[i].id}).then(data=>{
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
	}).catch(error=>{
		console.log(error);
	})
})

//查询商品属性
route.get('/queryCommProp',(req,resp)=>{
	massDB.queryCommProp().then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
	})
})

//商品详细图片
route.post('/commodityInfoDetails',(req,resp)=>{
	const param = req.body;
	massDB.commodityInfoDetails(param).then(data=>{
		resp.send(true);
	}).catch(error=>{
		console.log(error);
	})
})

//商品详细图片
route.post('/getCommDetails',(req,resp)=>{
	const param = req.body;
	massDB.getCommDetails(param).then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
	})
})


//添加轮播图
route.post('/addSlideShow',(req,resp)=>{
	var param = req.body;
	console.log('-----------');
	console.log(param,'addSlideShow--------------');
	massDB.querySlideShow(param).then((data)=>{
		// resp.send(data);
		if(data.length == 0){
			massDB.addSlideShow(param).then((data)=>{
				resp.send(true);
			}).catch((error)=>{
				console.log(error);
			});
		} else {
			massDB.updateSlideShow(param).then((data)=>{
				resp.send(true);
			}).catch((error)=>{
				console.log(error);
			});
		}
	}).catch((error)=>{
		console.log(error);
	});
	
})
//查询商品
route.post('/queryComm',(req,resp)=>{
	const param = req.body;
	massDB.queryComm(param).then(data=>{
		resp.send(data);
	}).catch(error=>{
		console.log(error);
		resp.send(error);
	})
})
//添加轮播图
route.post('/queryAllSlideShow',(req,resp)=>{
	massDB.queryAllSlideShow().then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		console.log(error);
	});
})
//查询轮播图
route.post('/querySlideShow',(req,resp)=>{
	var param = req.body;
	massDB.querySlideShow(param).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		console.log(error);
	});
})
module.exports = route;