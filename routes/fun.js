//自定义模块l
let myFun = {
	//随机数
	getRandom(){
		let a = parseInt(Math.random()*1000000);
		return a;
	},
	getFiles(folder){
		let fs = require('fs');
		return new Promise((resolve,reject) => {
			fs.readdir('./public/upload/'+folder,(err,files) => {
				// files.forEach((item,index)=>{

				// })
				resolve(files);
			})
		})
		
	},
	//邮件发送
	sendMail(param,num){
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
		        subject: 'oyh MALL 密码找回', // Subject line
		        text: '你好，这是测试邮件', // plain text body
		        html: '<b>如果不是您本人操作，请忽略！！</b></br><span>验证码：<span><b>'+num+'</b><br>5分钟内有效' // html body
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
	}
}


module.exports = myFun;