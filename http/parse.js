var url = require('url');
module.exports = function (req) {  // 将经常使用的放入req中
    var urlObj = url.parse(req.url,true);
    req.pathname = urlObj.pathname ;
    req.query = urlObj.query ;
    req.cookie = req.headers.cookie ;
}
