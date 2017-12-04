var needle = require('needle');

var URL = 'https://www.ferra.ru/ru/techlife/news/2013/03/04/This-domain-is-for-sale-etc/';

needle.get(URL, function(err, res){
    if (err) throw err;
    console.log(res.body);
    console.log(res.statusCode);
});
