let express = require('express');
const http = require('http');
const https = require('https');
let route = express.Router();

route.get('/test',(req,resp)=>{
	getData(req.query.url).then(data=>{
		resp.send(data);
	}).catch(error=>{
		resp.send(error);
	});
})

function getData(url){
	return new Promise((resolve,reject)=>{
		http.get(url,(res)=>{
			res.setEncoding('utf8');
			let rowData = '';
			res.on('data',(chunk)=>{
				rowData += chunk;
			})
			res.on('end',()=>{
				try {
					// const parseData = JSON.parse(rowData);
					// console.log('data:------');
					// console.log(rowData);
					resolve(rowData);
				} catch(e) {
					// console.log('error',e.message);
					reject(e.message);
				}
			});
		}).on('error',e=>{
			// console.log(`错误:${e.message}`);
			reject(e.message);
		})
	})
	
}
module.exports = route;