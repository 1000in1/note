var http = require('http');
var url = require("url");
var events = require('events');
var emitter = new events.EventEmitter();

var exe = '.do'

function initDir(base)
{
    var path = require('path');
    var fs=require("fs");
    var basePath = "/api"
    var baseDir = "."+ basePath;
    var files = fs.readdirSync(baseDir);

    for (var i in files)
    {
        console.log('load '+baseDir+"/"+files[i]);


        var route = basePath+"/"+path.basename(files[i],".js");
        if (fs.statSync(baseDir+"/"+files[i]).isDirectory())
        {
            continue;
        }

        require(baseDir+"/"+files[i]).init(route+exe,emitter);
    }

}



function start() {


    http.createServer(function (request, response) {

        if (emitter.emit(url.parse(request.url).pathname, request,response))
        {
           // console.log('rout ok');

        }else
        {
            response.writeHead(404, {"Content-Type": "text/plain"});

           // console.log('rout err');
            response.end();
        }


    }).listen(8000);
    console.log('Server running at http://127.0.0.1:8000/');
}


var cluster = require('cluster');

function main1(){

    //console.log(process);

    if (cluster.isMaster) {

        require('os').cpus().forEach(function(){
            cluster.fork();
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died');
        });
        cluster.on('listening', function(worker, address) {
            console.log("A worker with #"+worker.id+" is now connected to " +
                address.address +
                ":" + address.port);
        });
    } else {
        initDir("/api");
        start();
    }

}

function main(){


     initDir("/api");
     start();


}

main();

