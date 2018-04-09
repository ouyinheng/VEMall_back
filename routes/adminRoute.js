let express = require('express');
let adminDB = require('../db/adminDB');
let route = express.Router();

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
//查看图片
route.get('/queryImages',(req,resp)=>{
	resp.send("哈哈");
})
//发送邮件
route.post('/findPwd',(req,resp)=>{
	var param = req.body.param;
	console.log(param);
	//发送邮件
	'use strict';
	const nodemailer = require('nodemailer');

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {
	    // create reusable transporter object using the default SMTP transport
	    let transporter = nodemailer.createTransport({
	        host: 'smtp.qq.com',
	        port: 587,
	        secure: false, // true for 465, false for other ports
	        auth: {
	            user: '2675379992@qq.com',
	        	pass: 'tvveweagnkuneahi',
	        }
	    });

	    // setup email data with unicode symbols
	    let mailOptions = {
	        from: '"oyh mall 👻" <2675379992@qq.com>', // sender address
	        to: param, // list of receivers
	        subject: 'nodejs发送', // Subject line
	        text: '你好，这是测试邮件', // plain text body
	        html: '<b>加赠，收到请回复</b>' // html body
	    };

	    // send mail with defined transport object
	    transporter.sendMail(mailOptions, (error, info) => {
	        if (error) {
	            return console.log(error);
	        }
	        console.log('Message sent: %s', info.messageId);
	        // Preview only available when sending through an Ethereal account
	        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	    });
	});
})
module.exports = route;