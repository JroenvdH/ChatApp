const path = require('path');
//avoids going into server folder and than back up 1 folder to go to public
const publicPath = path.join(__dirname, '../public'); 
const express = require('express');
const port = process.env.PORT || 3000;

var app = express();

//showing express where to find the files
app.use(express.static(publicPath));

app.get('/', (req, res) => {
	res.render('index.html');
});

app.listen(port, ()=> {
	console.log(`server up on port ${port}`);
});


module.exports = {app}

