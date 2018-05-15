//自定义模块l
let myFun = {
	//随机数
	getRandom(){
		let a = parseInt(Math.random()*1000000);
		return a;
	},
	//获取时间
	getTime(){
		return new Date.toLocaleString()
	},
	getClientIp(req) {
        return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
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
		        from: '"VEMALL 👻" <2675379992@qq.com>', // sender address
		        to: param, // list of receivers
		        subject: 'VEMALL 密码找回', // Subject line
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
	},
	//邮件发送
	findPwd(param,num){
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
		        from: '"VEMALL 👻" <2675379992@qq.com>', // sender address
		        to: param, // list of receivers
		        subject: 'VEMALL 密码找回', // Subject line
		        text: '你好，这是测试邮件', // plain text body
		        html: `<!DOCTYPE html>
						<html>
						<head>
							<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
							<title></title>
							</head>
						<style media="all" type="text/css">
							td, p, h1, h3, a {
								font-family: Helvetica, Arial, sans-serif;
							}
						</style>
						<body bgcolor="" LINK="#6d93b8" ALINK="#9DB7D0" VLINK="#6d93b8" TEXT="#d7d7d7" style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #d7d7d7;">
						<table style="width: 538px; background-color: #393836;" align="center" cellspacing="0" cellpadding="0">
							<tr>
								<td style=" height: 65px; background-color: #000000; border-bottom: 1px solid #4d4b48;">
									<img src="http://192.168.17.138:3000/queryImages?img=icon/globalheader_logo.png" height="44" border="0" >
								</td>
							</tr>
							<tr>
								<td bgcolor="#17212e">
									<table width="470" border="0" align="center" cellpadding="0" cellspacing="0" style="padding-left: 5px; padding-right: 5px; padding-bottom: 10px;">

										<tr>
											<td style="padding-top: 32px; font-size: 24px; color: #66c0f4; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">
												您好，					</td>
										</tr>
										<tr>
											<td style="padding-top: 10px; padding-bottom: 30px; font-size: 24px; color: #66c0f4; font-family: Arial, Helvetica, sans-serif;">
												您正在重置您的VEMall商城登录密码,如果不是您本人操作,请忽略!!!!					</td>
										</tr>

										<tr>
											<td style="font-size: 14px; padding: 16px; background-color:#121a25; color:#FFF" >
												如果您忘记了凭据，您可以选择找回您的 VEMall 帐户，或继续创建一个新的 VEMall 帐户。					</td>
										</tr>

										<tr>
											<td style="padding: 16px; background-color:#121a25;">
												<table cellpadding="0" cellspacing="0" border="0" align="center">
													<tr>
																							<td style="background: #799905;height:32px">
																<a href="https://help.steampowered.com/zh-cn/wizard/HelpWithLogin"  style="border-radius: 2px; padding: 1px; display: block; text-decoration: none; color: #D2E885; background: #799905; background: -webkit-linear-gradient( top, #799905 5%, #536904 95%);background: linear-gradient( to bottom, #799905 5%, #536904 95%);text-shadow: -1px -1px 0px rgba( 0, 0, 0, 0.1 );" >
																<span style="border-radius: 2px; display: block; padding: 0; font-size: 16px; line-height: 32px; ">
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																</span>
																</a>
															</td>
															<td style="width:30px;height: 32px">

															</td>
																					</tr>
												</table>
											</td>
										</tr>

										<tr>
											<td style="padding-top: 16px; font-size: 12px; line-height: 17px; color: #6d7880;">
												您需要向 VEMall 提供一个验证过的电子邮件地址来使用 VEMall 的完整功能，诸如 VEMall VEMall VEMall 交易 - 以及在未来能够安全的找回您的帐户。					</td>
										</tr>

										<tr>
											<td style="padding-top: 16px; font-size: 12px; line-height: 17px; color: #6d7880;" >
												感谢您协助我们确认您帐户的安全性。					</td>
										</tr>

										<tr>
											<td style="font-size: 12px; color: #6d7880; padding-top: 16px; ">
												- VEMall 团队					</td>
										</tr>

										<tr>
											<td style="padding-top: 40px; font-size: 12px; line-height: 17px; color: #6d7880; ">
												*若您最近并未使用本电子邮件地址新建 VEMall 帐户，您可以放心的忽视此邮件。					</td>
										</tr>

									</table>
								</td>
							</tr>
							<tr style="background-color: #000000;">
								<td style="padding: 12px 24px;">
									<table cellpadding="0" cellspacing="0">
										<tr>
											<td width="92">
												<img src="https://steamstore-a.akamaihd.net/public/images/logo_valve_footer.jpg" width="92" height="26" alt="Valve&reg;">
											</td>
											<td style=" font-size: 11px; color: #595959; padding-left: 12px;">
												© Valve Corporation. PO Box 1688 Bellevue, WA 98009.<br>
												保留所有权利。所有商标均为其在美国及其它国家/地区的各自持有者所有。					</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>

						</body>
						</html>`// html body
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