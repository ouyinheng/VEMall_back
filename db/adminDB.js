let pool = require('./pool');

module.exports = {
	login(data){
		sql = "select * from admin where username='"+data.username+"' and password='"+data.password+"'";
		return pool.execute(sql);
	},
	// 查询所有方向
	findAll(){
		sql = "select * from personnel";
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
	}

}