var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');

var URL = 'https://www.rademacher.de/licht/aktoren/duofern-universal-dimmaktor-up/';
var results = [];

var q = tress(function(url, callback){
  needle.get(url, function(err, res){
    if (err) throw err;
    console.log(res.body);

    // parse DOM
    var $ = cheerio.load(res.body);

    console.log($('.linearize-level-1 .csc-textpic-text h1').contents().eq(1).text());
    console.log($('.linearize-level-1 .csc-textpic-text h2').contents().eq(1).text());

    //информация о новости
    // if($('.b_infopost').contents().eq(2).text().trim().slice(0, -1) === 'Алексей Козлов'){
    //   results.push({
    //     title: $('h1').text(),
    //     date: $('.b_infopost>.date').text(),
    //     href: url,
    //     size: $('.newsbody').text().length
    //   });
    // }

    // //список новостей
    // $('.b_rewiev p>a').each(function() {
    //   q.push($(this).attr('href'));
    // });
    //
    // //паджинатор
    // $('.bpr_next>a').each(function() {
    //   // не забываем привести относительный адрес ссылки к абсолютному
    //   q.push(resolve(URL, $(this).attr('href')));
    // });
    //
    // callback();
  });
// }, 10); // запускаем 10 параллельных потоков
}); // запускаем 10 параллельных потоков

q.drain = function(){
  fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
}

q.push(URL);