var util = require('util')
module.exports = function (ws, req, next) {
	util.inspect(ws)
	ws.send('你连接成功了')
	ws.on('message', function (msg) {
		ws.send('echo:' + msg)
	})
	ws.on('close', function(){
		console.log("closed");
	});
};
