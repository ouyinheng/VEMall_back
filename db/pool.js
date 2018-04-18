let mysql = require('mysql');

let pool = global.pool;
if(!pool){
	pool = mysql.createPool({
		database:'mall',
		user:'root',
		password:'963110',
	});
	global.pool = pool;
} 

//获取链接
function getConnection(){
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err,conn){
      if(!err){
        resolve(conn);
      }else {
        reject(err);
      }
    });
  })
}

//执行sql
function execute(sql){
  return new Promise((resolve,reject)=>{
    let connection;
    getConnection().then((coon)=>{
      connection = coon;
      coon.query(sql,(err,results)=>{
        if(!err){
          resolve(results);
        } else {
          reject(err);
        }
      });
    }).catch((err)=>{
      reject(err);
    }).finally(()=>{
      if(connection){
        connection.release();
      }
        console.log("释放完成");
    });
  });
}

module.exports = {
  getConnection : getConnection,
  execute : execute
};