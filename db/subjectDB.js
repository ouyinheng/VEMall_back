let pool = require('./pool');

module.exports = {
	// 查询所有方向
	findAll(){
		sql = "select * from personnel";
		return pool.execute(sql);
	},
	login(data){
		sql = "select * from personnel where username='"+data.username+"' and password='"+data.password+"'";
		return pool.execute(sql);
	}
}