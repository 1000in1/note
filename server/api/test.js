/**
 * Created by mazhou on 15/4/22.
 */
var url = require("url");
var querystring = require("querystring");

exports.init = function(route,obj)
{
    obj.on(route, function(request, response) {
        var postData = "";


        if (request.method==="GET")
        {
            var arg = url.parse(request.url, true).query;
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(arg));
            response.end();

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








        //console.log("wait");

    });

}