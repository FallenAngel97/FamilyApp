var e='<html><head>\n<base href="file:///C:/inetpub/wwwroot/theFamilyTree/run/">\n<meta charset="utf-8"><link rel="stylesheet" type="text/css" href="styles/main.css">\n<style></style></head><body>\n<header><div class="textBlockHeader">Family Tree</div><div class="triangle"></div></header><main><h2 id="greetingText" style="opacity: 1;">Make your ancestry <span>digital!</span></h2><section style="opacity:1"><div class="helpText"> <div class="actuallyText">Use directional buttons(Up, down etc) to move the image to the right place. Use the +- buttons to resize it.</div><div class="helpers"><div id="closeButton">X</div><div id="triangle"></div></div></div><div class="singlePersonWrapper"><div class="personHolder"><div class="movePersonCircle" draggable="true"></div><div class="addTree">+</div><div class="addTree right">+</div><br><img class="leftTree" src="img/tree-left.svg"><img class="rightTree" src="img/tree-right.svg"><div class="singlePerson"><img class="emptyPersonImage" src="img/noperson.svg"><input accept="image/*" type="file"></div><div class="infoAdd">i</div><div class="credentialsBlock"></div><br><input placeholder="John" value="John" type="text"><br><input placeholder="Doe" value="Doe" type="text"><input class="biography" type="hidden"></div></div></section></main><footer><div class="scaler"><span class="text">scale: </span><span class="scaleNumber"> 100%</span><input id="sliderScale" min="50" max="200" type="range"></div><div class="saver"><div class="saveAsText">Save As</div><br><ul class="formats"><li>.jpg </li><li class="sep">|</li><li> .pdf</li></ul></div></footer><script src="scripts/main.js"></script></body>\n</html>',i=require("webpage").create();i.viewportSize={width:1366,height:768},i.onError=function(e,i){console.log(e),i.forEach(function(e){console.log("  ",e.file,":",e.line)})},i.onResourceRequested=function(e,i){console.log("::loading",e.url)},i.onResourceReceived=function(e){console.log("Response (#"+e.id+', stage "'+e.stage+'"): '+JSON.stringify(e))},i.onLoadFinished=function(){console.log("::rendering"),window.setTimeout(function(){i.render("file.jpg"),phantom.exit()},7e3)},i.content=e;