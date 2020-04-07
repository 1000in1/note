/**
 * Created by mazhou on 15/4/22.
 */
var url = require("url");
var querystring = require("querystring");
var fs=require('fs');

var filename = './nodejs/server/';

exports.init = function(route,obj)
{
    obj.on(route, function(request, response) {
        var postData = "";

        //console.log(JSON.stringify(request));
        if (request.method==="GET")
        {
            var arg = url.parse(request.url, true).query;

            fs.readFile(filename+arg.filename, "binary", function (err, file) {
                if (err) {
                    response.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    response.end("file not found!");
                } else {
                    var contentType = "application/octet-stream";
                    response.writeHead(200, {
                        'Content-Type': contentType,
                        'Conent-Length':file.length
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });

            /*

            response.writeHead(200, {"Content-Type": "text/plain"});

            response.write(filename+arg.filename);


            //response.write(JSON.stringify(arg));
            response.end();
            */

        }else
        {
            request.setEncoding("utf8");
            request.addListener("data", function(postDataChunk) {
                postData += postDataChunk;
            });
            request.addListener("end", function() {
                response.writeHead(200, {"Content-Type": "text/plain"});
                var params = querystring.parse(decodeURIComponent(postData));

                response.write(JSON.stringify(params));


                response.end();
            });

        }








        //console.log("JSON.stringify(params)");

    });

}
