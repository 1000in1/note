/**
 * Created by mazhou on 15/4/22.
 */
var url = require("url");
var querystring = require("querystring");

var data={};

data.status = true;
//data.msg = null;
data.data={};
data.data.url='/download.do';
data.data.version='v1.0.20160107';
data.data.md5='1231231231231231231231';

exports.init = function(route,obj)
{
    obj.on(route, function(request, response) {
        var postData = "";


        if (request.method==="GET")
        {
            var arg = url.parse(request.url, true).query;
            response.writeHead(200, {"Content-Type": "text/plain"});

            response.write(JSON.stringify(data));

            //response.write(JSON.stringify(arg));
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

                //response.write(JSON.stringify(params));
                response.write(JSON.stringify(data));

                response.end();
            });

        }








        //console.log("wait");

    });

}
