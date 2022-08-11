var ProgressBar = require('progress');
 
// var bar = new ProgressBar(':current ', { total: 100 });
// var timer = setInterval(function () {
//   bar.tick();
//   if (bar.complete) {
//     console.log('\ncomplete\n');
//     clearInterval(timer);
//   }
// }, 100);


// var contentLength = 128 * 1024;
// var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
//   complete: '='
// , incomplete: ' '
// , width: 20
// , total: contentLength
// });

// (function next() {
// if (contentLength) {
//   var chunk = Math.random() * 10 * 1024;
//   bar.tick(chunk);

//   if (!bar.complete) {
//     setTimeout(next, Math.random() * 1000);
//   }
// }
// })();

// var bar = new ProgressBar(':current: :token1 :token2', { total: 3 })
// bar.tick({
//   'token1': "Hello",
//   'token2': "World!\n"
// })
// bar.tick(2, {
//   'token1': "Goodbye",
//   'token2': "World!"
// })


var https = require('https');
 
var req = https.request({
  host: 'download.github.com',
  port: 443,
  path: '/visionmedia-node-jscoverage-0d4608a.zip'
});
 
req.on('response', function(res){
  var len = parseInt(res.headers['content-length'], 10);
 
  console.log();
  var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: len
  });
 
  res.on('data', function (chunk) {
    bar.tick(chunk.length);
  });
 
  res.on('end', function () {
    console.log('\n');
  });
});
 
req.end();