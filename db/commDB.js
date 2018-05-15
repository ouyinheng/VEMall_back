let pool = require('./pool');

module.exports = {
	//添加商品
	addCommodity(data,url){
		sql = "insert into commodity values (null,'"+data.shortname+"','"+data.longname+"','"+data.intro+"','"+data.classify+"',"
		+data.price+","+data.num+","+data.astrict+",'"+data.region+"','"+data.property+"','"+data.details+"','"+data.displayImg+"')";
		return pool.execute(sql);
	},
	editCommodity(param){
		sql = "update commodity set property='"+param.property+"' where id="+param.id;
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
	//商品图片
	addPicture(id,url){
		sql = "insert into picture values (null,"+id+",'"+url+"')";
		return pool.execute(sql);
	},
	//查询对应商品的图片
	getComImg(param){
		sql = "select * from picture where commodity_id="+param.id;
		return pool.execute(sql);
	},
	queryCommProp(){
		sql = "select distinct classify from commodity";
		return pool.execute(sql);
	},
	commodityInfoDetails(param){
		sql = "insert into comminfo values(null,"+param.commid+",'"+param.picture+"')";
		return pool.execute(sql);
	},
	
	getCommDetails(param){
		sql = "select * from comminfo where comm_id="+param.id;
		return pool.execute(sql);
	},
	//查询轮播图
	querySlideShow(param){
		sql = "select * from slideshow where commodity_id="+param.id;
		return pool.execute(sql);
	},
	//添加轮播图
	addSlideShow(param){
		sql = "insert into slideshow values (null,"+param.id+",'"+param.url+"')";
		return pool.execute(sql);
	},
	//修改轮播图
	updateSlideShow(param){
		sql = "update slideshow set url='"+param.url+"' where commodity_id="+param.id;
		return pool.execute(sql);
	},
	queryAllSlideShow(){
		sql = "select * from slideshow";
		return pool.execute(sql);
	},
	//查询商品
	queryComm(data){
		sql = "select * from commodity where id="+data.id;
		return pool.execute(sql);
	},
}