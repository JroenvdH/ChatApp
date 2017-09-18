const path = require('path');
const http = require('http');
//avoids going into server folder and than back up 1 folder to go to public
const publicPath = path.join(__dirname, '../public'); 
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server)

//showing express where to find the files
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected!');

	socket.on('disconnect',() => {
		console.log('client disconnected');
	})
})

app.get('/', (req, res) => {
	res.render('index.html');
});

server.listen(port, ()=> {
	console.log(`server up on port ${port}`);
});


module.exports = {app}

