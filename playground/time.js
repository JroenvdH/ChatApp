var moment = require('moment'); 

//Wow.. this gets really annoyingly complicated when involving, days of month, year
//relative time (1 min ago) etc.
var date = new Date();
var months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
stringMonth= months[date.getMonth()]
console.log(stringMonth);


// new Date().getTime()
//Timestamp based on the unix epoch. (jan 1st 1970, 0:00 UTC)
var someTimeStamp = moment().valueOf();
console.log(moment(someTimeStamp).format('ss'));

//creates new obj that represents current moment in time
var date = moment();
console.log(date.format('h:mm a' ));


