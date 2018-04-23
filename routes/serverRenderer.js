/**
服务端渲染
*/
const Vue = require('vue')
const serverRenderer = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
	
serverRenderer.get('/testServer', (req, res) => {
	console.log('sdfsdfsdfsdf大宋');
    res.setHeader("Content-type", "text/html;charset=UTF-8"); 
  	const app = new Vue({
	    data: {
	      	url: req.url
	    },
	    template: `<div>访问的 URL 是： {{ url }}</div>`
	})
  	renderer.renderToString(app, (err, html) => {
	    if (err) {
		    res.status(500).end('Internal Server Error')
		    return
	    }
	    res.end(`
	      <!DOCTYPE html>
	      <html lang="en">
	        <head><title>Hello</title></head>
	        <body>${html}</body>
	      </html>
	    `)
	})
})
serverRenderer.listen(8080)
module.exports = serverRenderer;
