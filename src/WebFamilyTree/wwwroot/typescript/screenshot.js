// var args = require('system').args;
// var page = require("webpage").create();
// var html = args[1] as string;
var html = "<html><head>\n<base href=\"file:///C:/inetpub/wwwroot/theFamilyTree/run/\">\n<meta charset=\"utf-8\"><link rel=\"stylesheet\" type=\"text/css\" href=\"styles/main.css\">\n<style></style></head><body>\n<header><div class=\"textBlockHeader\">Family Tree</div><div class=\"triangle\"></div></header><main><h2 id=\"greetingText\" style=\"opacity: 1;\">Make your ancestry <span>digital!</span></h2><section style=\"opacity:1\"><div class=\"helpText\"> <div class=\"actuallyText\">Use directional buttons(Up, down etc) to move the image to the right place. Use the +- buttons to resize it.</div><div class=\"helpers\"><div id=\"closeButton\">X</div><div id=\"triangle\"></div></div></div><div class=\"singlePersonWrapper\"><div class=\"personHolder\"><div class=\"movePersonCircle\" draggable=\"true\"></div><div class=\"addTree\">+</div><div class=\"addTree right\">+</div><br><img class=\"leftTree\" src=\"img/tree-left.svg\"><img class=\"rightTree\" src=\"img/tree-right.svg\"><div class=\"singlePerson\"><img class=\"emptyPersonImage\" src=\"img/noperson.svg\"><input accept=\"image/*\" type=\"file\"></div><div class=\"infoAdd\">i</div><div class=\"credentialsBlock\"></div><br><input placeholder=\"John\" value=\"John\" type=\"text\"><br><input placeholder=\"Doe\" value=\"Doe\" type=\"text\"><input class=\"biography\" type=\"hidden\"></div></div></section></main><footer><div class=\"scaler\"><span class=\"text\">scale: </span><span class=\"scaleNumber\"> 100%</span><input id=\"sliderScale\" min=\"50\" max=\"200\" type=\"range\"></div><div class=\"saver\"><div class=\"saveAsText\">Save As</div><br><ul class=\"formats\"><li>.jpg </li><li class=\"sep\">|</li><li> .pdf</li></ul></div></footer><script src=\"scripts/main.js\"></script></body>\n</html>";
// console.log(page.content);
// setTimeout(function() {
//     page.render('tmp.jpg');
//     phantom.exit();
// }, 5000);
var page = require('webpage').create();
page.viewportSize = { width: 1366, height: 768 };
page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function (item) {
        console.log('  ', item.file, ':', item.line);
    });
};
page.onResourceRequested = function (requestData, request) {
    console.log('::loading', requestData['url']); // this does get logged now
};
page.onResourceReceived = function (response) {
    console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};
page.onLoadFinished = function () {
    console.log('::rendering');
    window.setTimeout(function () {
        page.render("file.jpg");
        phantom.exit();
    }, 7000);
};
page.content = html;
