let pool = require('./pool');

module.exports = {
	login(data){
		sql = "select * from admin where username='"+data.username+"' and password='"+data.password+"'";
		return pool.execute(sql);
	},
	//添加商品
	addCommodity(data,url){
		sql = "insert into commodity values (null,'"+data.name+"','"+data.intro+"','"+data.classify+"',"
		+data.price+","+data.num+","+data.astrict+",'"+data.region+"','"+data.property+"','"+data.details+"')";
		return pool.execute(sql);
	},
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
	editUserInfo(param){
		sql = "update personnel set username='"+param.username+"',password='"+param.password+"',status="+param.status+" where id="+param.id;
		return pool.execute(sql);
	},
	delUserInfo(param){
		sql = "delete from personnel where id = "+param.id;
		return pool.execute(sql);
	},
	//注册用户
	registerUser(){

	},
	//如果邮箱已存在，则失败
	findEmail(data){
		sql = "select id from email where email = '"+data.email+"'";
		return pool.execute(sql);
	},
	//发送验证码
	addEmailAuth(data){
		sql = "insert into email values (null,'"+data.email+"',"+data.auth+",(select max(id) from personnel)+1,'"+
		data.begintime+"','"+data.endtime+"',"+data.status+")";
		return pool.execute(sql);
	},
	//验证码失效
	loseAuth(data){
		sql = "update email set status=0,endtime = '"+data.endtime+"' where id = "+data.id;
		return pool.execute(sql);
	}
}