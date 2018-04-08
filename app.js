require('babel-polyfill');
var Geetest = require('gt3-sdk');
var session = require('express-session');
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');//文件上传

var adminRoute = require('./routes/adminRoute');
var massRoute = require('./routes/massRoute');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/*var multer = require('multer');
var upload = multer({
    dest: './public/upload/'
});*/
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));
// pc 端接口

var captcha1 = new Geetest({
    geetest_id: 'c08676bb018656d3bded95215c034249',
    geetest_key: 'da11dfd5ac9119a37f495b98b7341b1c'
});
app.get("/gt/register1", function (req, res) {
    // 向极验申请每次验证所需的challenge
    captcha1.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/form-validate1", function (req, res) {

    // 对form表单提供的验证凭证进行验证
    captcha1.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send(err);

        } else if (!success) {

            // 二次验证失败
            res.send("<h1 style='text-align: center'>登录失败</h1>");

        } else {
            res.send("<h1 style='text-align: center'>登录成功</h1>");
        }

    });
});

var captcha2 = new Geetest({
    geetest_id: 'c08676bb018656d3bded95215c034249',
    geetest_key: 'da11dfd5ac9119a37f495b98b7341b1c'
});

app.get("/gt/register2", function (req, res) {

    // 向极验申请每次验证所需的challenge
    captcha2.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/ajax-validate2", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    captcha2.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {

            res.send({
                status: "success",
                info: '登录成功'
            });
        }
    });
});
// 显示图片
app.get("/queryImages",function(req,res,next) {
  const filename = req.query.img;
    fs.readFile('./public/upload/'+filename,'binary',function(err, file) {
      if (err) {
        console.log(err);
        return;
      }else{
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.write(file,'binary');
          res.end();
      }
    });  
});
//拦截请求
app.post("/admin/savefile",function (req,res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/public/upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
        var files = files.file;
        var filename = files.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.path, newPath);  //重命名
        // res.send({data:"/public/upload/"+avatarName});
        res.send({data:avatarName});
    })
});
app.get('/admin/queryImages',(req,resp)=>{
  console.log("异步方法执行");
  // file.readImg('./public/upload/psb_2018_2_6_19_18.jpg',response); 
  readfile('./public/upload/psb_2018_2_6_19_18.jpg',function(data){
    console.log(data);
    resp.send(data);
  })

})
function readfile(path,callback){          //异步读文件，需要传入回调函数
     fs.readFile(path,function(err,data){
        if(err){
            console.log(err);
        }else{
            callback(data);
        }
    });
    console.log("异步方法执行完毕");
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));//将文件设置成静态
app.use('/admin', adminRoute);
app.use('/mass', massRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
