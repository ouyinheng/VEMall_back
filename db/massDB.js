let pool = require('./pool');

module.exports = {
	// 查询所有社团
	findAll(){
		sql = "select * from mass";
		return pool.execute(sql);
	}
	
}