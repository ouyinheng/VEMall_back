let pool = require('./pool');

module.exports = {
	login(data){
		sql = "select * from personnel where username='"+data.username+"' and password='"+data.password+"'";
		return pool.execute(sql);
	},
	adminLogin(data){
		sql = "select * from admin where username='"+data.username+"' and password='"+data.password+"'";
		return pool.execute(sql);
	},
	//添加商品
	addCommodity(data,url){
		console.log(data);
		sql = "insert into commodity values (null,'"+data.shortname+"','"+data.longname+"','"+data.intro+"','"+data.classify+"',"
		+data.price+","+data.num+","+data.astrict+",'"+data.region+"','"+data.property+"','"+data.details+"','"+data.displayImg+"')";
		return pool.execute(sql);
	},
	//商品图片
	addPicture(id,url){
		sql = "insert into picture values (null,"+id+",'"+url+"')";
		return pool.execute(sql);
	},
	//查询商品
	queryCommodity(param){
		if(param.property == null){
			sql = "select * from commodity";
		} else {
			sql = "select * from commodity where property='"+param.property+"'";
		}
		return pool.execute(sql);
	},
	//添加轮播图
	addSlideShow(param){
		sql = "insert into slideshow values (null,"+param.id+",'"+param.url+"')";
		return pool.execute(sql);
	},
	//查询轮播图
	querySlideShow(param){
		sql = "select * from slideshow where commodity_id="+param.id;
		return pool.execute(sql);
	},
	queryAllSlideShow(){
		sql = "select * from slideshow";
		return pool.execute(sql);
	},
	//修改轮播图
	updateSlideShow(param){
		sql = "update slideshow set url='"+param.url+"' where commodity_id="+param.id;
		return pool.execute(sql);
	},
	//查询对应商品的图片
	getComImg(param){
		sql = "select * from picture where commodity_id="+param.id;
		return pool.execute(sql);
	},
	getCom(param){
		sql = "select * from commodity where id="+param.id;
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
	editUserIcon(param){
		sql = "update personnel set icon_url='icon/"+param.icon_url+"' where id="+param.id;
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
	//添加收货地址
	addUserInfo(data){
		sql = "insert into info values(null,"+data.id+",'"+data.name+"','"+data.site+"','"+data.tel+"',0)";
		return pool.execute(sql);
	},
	//获取收货地址
	getUserInfo(data){
		sql = "select * from info where personnel_id="+data.id;
		return pool.execute(sql);
	},
	getUserSite(data){
		sql = "select * from info where id="+data.id;
		return pool.execute(sql);
	},
	//修改默认收货地址
	editUserInfo(data){
		sql = "update info set status="+data.status+" where id="+data.id;
		return pool.execute(sql);
	},
	//添加订单
	addUserOrder(data){
		sql = "insert into orderFrom values(null,"+data.user_id+",'"+JSON.stringify(data.commodityInfo)+"',"+data.site_id+",0,'"+data.order_time+"',null)";
		return pool.execute(sql);
	},
	//删除订单
	delUserOrder(data){
		sql = "delete from orderFrom where id="+data.id;
		return pool.execute(sql);
	},
	//查询订单
	queryUserOrder(data){
		if(data.id == null){
			sql = "select * from orderFrom";
			return pool.execute(sql);
		} else {
			sql = "select * from orderFrom where user_id="+data.id;
			return pool.execute(sql);
		}
	},
	//修改订单
	editUserOrder(data){
		sql = "update orderFrom set "+data.obj+"="+data.data+" where id = "+data.id;
		return pool.execute(sql);
	},
	//查询商品
	queryComm(data){
		sql = "select * from commodity where id="+data.id;
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