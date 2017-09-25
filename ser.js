var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var filePath = __dirname + "/data/users.txt";
app.use(express.static(__dirname+"/static"));


app.post("/user/register",urlencodedParser,function(req,res) {
            fs.readFile (filePath,"utf8",function(err,data){
                var dataFile;
                if(err) {
                    dataFile = {};
                    dataFile.countUser = 1;
                    console.log("создание файла ",filePath)
                } else {
                    dataFile = JSON.parse(data);
                    dataFile.countUser++;
                }
                    var bodyReq = req.body;
                    bodyReq.id = dataFile.countUser;
                    dataFile["user "+dataFile.countUser] = bodyReq;
                    fs.writeFile(filePath,JSON.stringify(dataFile),function(err) {
                       if(!err) {
                            console.log('в файле '+dataFile.countUser +' пользователей')
                            res.end("ok")
                       } else{
                           res.end("Ошибка при записи")
                       }
                   }) 
            })
            
        })
app.get("/",function(req,res) {
        res.send("<h1>welcome</h1>");
    })
app.listen(3000,function(){
    console.log("new conect");
})
