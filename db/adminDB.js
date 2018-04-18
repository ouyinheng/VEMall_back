let pool = require('./pool');

module.exports = {
	login(data){
		sql = "select * from personnel where username='"+data.username+"' and password='"+data.password+"'";
		return pool.execute(sql);
	},
	//添加商品
	addCommodity(data,url){
		sql = "insert into commodity values (null,'"+data.name+"','"+data.intro+"','"+data.classify+"',"
		+data.price+","+data.num+","+data.astrict+",'"+data.region+"','"+data.property+"','"+data.details+"')";
		return pool.execute(sql);
	},
	//商品图片
	addPicture(id,url){
		console.log(id,url);
		sql = "insert into picture values (null,"+id+",'"+url+"')";
		return pool.execute(sql);
	},
	//对用户的操作
	findAll(){	// 查询所有用户
		sql = "select * from personnel";
		return pool.execute(sql);
	},
	//编辑用户信息
	editUserInfo(param){
		sql = "update personnel set username='"+param.username+"',password='"+param.password+"',status="+param.status+" where id="+param.id;
		return pool.execute(sql);
	},
	//删除用户信息
	delUserInfo(param){
		sql = "delete from personnel where id = "+param.id;
		return pool.execute(sql);
	},
	//注册用户
	registerUser(data){
		sql = "insert into personnel (username,password,email) values('"+data.username+"','"+data.password+"','"+data.email+"')";
		return pool.execute(sql);
	},
	//如果邮箱已存在，则失败
	findEmail(data){
		sql = "select id from personnel where email = '"+data.email+"'";
		return pool.execute(sql);
	},
	//发送验证码
	addEmailAuth(data){
		sql = "insert into email values (null,'"+data.email+"',"+data.auth+",(select max(id) from personnel)+1,'"+
		data.begintime+"','"+data.endtime+"',"+data.status+")";
		return pool.execute(sql);
	},
	//验证邮箱
	toVerifyMail(data){
		sql = "select id from email where verify = "+data.emailAuth+" and email='"+data.email+"'";
		return pool.execute(sql);
	},
	//验证码失效
	loseAuth(data){
		sql = "update email set status=0,endtime = '"+data.endtime+"' where id = "+data.id;
		return pool.execute(sql);
	}
}