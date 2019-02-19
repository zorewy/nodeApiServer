// 引入 ws 支持 WebSocket 的实现
const ws = require('ws');
/**
 *
 * @param server
 * @param middleware
 */
const listen = (server, middleware) => {
	const wss = new ws.Server({ server, path: '/ws' });
	// console.log('readyState', wss)
	wss.on('connection', (ws, req) => {
		serveMessage(ws)
	})
	wss.on('message', (msg) => {
		ws.send(JSON.stringify(msg));
	})
	wss.on('error', (err) => {
		console.log('error',err);
	});
	wss.on('close', (err) => {
		console.log('close',err);
	});
}
const serveMessage = (ws) => {
	console.log('ws', ws.readyState)
	ws.on('message', (message) => {
		let data = {
			type: 'open',
			data: Math.round(Math.random() * 0xFFFFFF).toString()
		}
		ws.send(JSON.stringify(data));
		// setInterval(function () {
		// 	ws.send(JSON.stringify(data));
		// }, 1000)
	});

	// 监听关闭事件
	ws.on('close', (code, message) => {
		console.log(`WebSocket client closed (code: ${code}, message: ${message || 'none'})`);
	});
}
// 导出处理方法
exports.listen = listen;
