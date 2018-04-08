let express = require('express');
let massDB = require('../db/massDB');
let route = express.Router();

route.post('/findAll',( req,resp ) => {
	massDB.findAll().then( (data) => {
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});





module.exports = route;