function e(){d.style.marginTop=parseInt(p)-1+"px",p=d.style.marginTop,d.style.opacity=parseFloat(d.style.opacity)-.02+"",parseInt(p)>-20?setTimeout(function(){e()},10):(d.style.display="none",a("main")[0].style.cursor="move")}function t(e){console.log(this),this.parentElement.parentElement.style.opacity="0.4"}function n(e,t){var n=parseInt(getComputedStyle(e).width),l=parseInt(getComputedStyle(t).width),r=parseInt(getComputedStyle(t).height);t.style.cssText="display:block;left:calc(50% - "+(l/2-10)+"px); top:-"+r+"px;transform-origin:"+(l/2-10)+"px "+(n/2+r)+"px;"}function l(e){return e.preventDefault&&e.preventDefault(),e.dataTransfer.dropEffect="move",!1}function r(e){var t=e.parentElement.getElementsByTagName("textarea");if(t.length>0)return void e.parentElement.removeChild(t[0]);var n=document.createElement("textarea");n.innerHTML="Input some biography/notes here",s("infoAdd")[0].parentElement.appendChild(n)}function a(e){return document.getElementsByTagName(e)}function o(e){return document.getElementById(e)}function s(e){return document.getElementsByClassName(e)}var i=o("sliderScale"),c=!1,d=o("greetingText"),p=getComputedStyle(d)["margin-top"],m=s("singlePerson"),u=null,g=!1,y=s("scaleNumber")[0],f=-168,h=!1;d.style.opacity="1",i.value="100",i.onchange=function(e){s("scaleNumber")[0].innerHTML=i.value+"%",a("main")[0].style.transform="scale("+parseInt(i.value)/100+")"},document.querySelectorAll("ul.formats li")[0].onclick=function(){var e=new XMLHttpRequest;e.open("POST","ajaxer.php",!0),e.onreadystatechange=function(){4==e.readyState&&(200==e.status?console.log(e.responseText):console.log("error: "+e.statusText))};var t=new FormData;t.append("htmlToParse",document.documentElement.innerHTML),e.send(t)},y.onclick=function(t){i.style.display="block",c||(c=!0,e())},document.body.ondblclick=function(){h=!h},document.onmousemove=function(e){var t=s("boundingRectangle")[s("boundingRectangle").length-1].getBoundingClientRect();if(0!=h&&void 0!==t){console.log(e.pageX);var n=[t.left+20,t.top+20],l=Math.atan2(e.pageX-n[0],-(e.pageY-n[1]))*(180/Math.PI);s("leftTree")[s("leftTree").length-2].style.transform="rotate("+l+"deg)"}};var v=document.querySelectorAll(".movePersonCircle");[].forEach.call(v,function(e){e.addEventListener("dragstart",t,!1),e.addEventListener("dragover",l,!1)}),document.onclick=function(t){var l=t.target,o=l.className;if(t.target!=i&&t.target!=y&&(i.style.display="none"),"singlePerson"===o||"emptyPersonImage"===o){c||e(),"emptyPersonImage"===o&&(l=l.parentElement);for(var d=s("addTree"),p=0;p<d.length;p++)d[p].className.indexOf("treeShown")===-1&&(d[p].style.display="inline-block");var m=document.createEvent("MouseEvents");m.initEvent("click",!1,!0);var h=l.getElementsByTagName("input")[0];return h.dispatchEvent(m),void(h.onchange=function(e){if(h.files&&h.files[0]){var t=new FileReader;t.onload=function(e){0==g&&(s("helpText")[0].style.display="block");var t=l.getElementsByTagName("img")[0];t.src=e.target.result,t.onload=function(){t.style.width="256px"},u=t},t.readAsDataURL(h.files[0])}})}if("infoAdd"===o)return void r(l);if(o.indexOf("addTree")>-1){var v=l.parentElement.getElementsByClassName("leftTree")[0],E=!0;o.indexOf("right")>-1&&(v=l.parentElement.getElementsByClassName("rightTree")[0],E=!1),v.style.display="block",l.className+=" treeShown";var T=v.getBoundingClientRect(),x=document.createElement("div");x.className="singlePersonWrapper",x.style.position="absolute",E?x.style.left=T.left-80+"px":x.style.left=T.right-180+"px",x.style.top=f+"px",f*=2;for(var C=s("personHolder")[s("personHolder").length-1],b=C.cloneNode(!0),p=0;p<b.childElementCount;p++){var w=b.children[p],k=w.className;if(w.className=k.replace("treeShown",""),"boundingRectangle"==k)for(var N=w.children[0],S=0;S<N.childElementCount;S++)N.children[S].removeAttribute("style");(k.indexOf("leftTree")>-1||k.indexOf("rightTree")>-1)&&(w.removeAttribute("style"),n(w,w)),"singlePerson"==k&&(w.children[1].src="images/noperson.svg",w.children[1].removeAttribute("style"))}for(var p=0;p<C.childElementCount;p++)if("boundingRectangle"==C.children[p].className){console.log(C.children[p].children[0]);for(var N=C.children[p].children[0],I=0;I<N.childElementCount;I++)N.children[I].hasAttribute("style")&&n(N,N.children[I])}x.appendChild(b),a("section")[0].appendChild(x),console.log(document.getElementsByClassName("rightTree")[1].y)}},document.onkeydown=function(e){if(null!=u)switch(e.key){case"ArrowUp":u.style.marginTop=parseInt(getComputedStyle(u)["margin-top"])-1+"px";break;case"ArrowDown":u.style.marginTop=parseInt(getComputedStyle(u)["margin-top"])+1+"px";break;case"ArrowLeft":u.style.marginLeft=parseInt(getComputedStyle(u)["margin-left"])-1+"px";break;case"ArrowRight":u.style.marginLeft=parseInt(getComputedStyle(u)["margin-left"])+1+"px";break;case"+":u.style.width=parseInt(getComputedStyle(u).width)+1+"px";break;case"-":u.style.width=parseInt(getComputedStyle(u).width)-1+"px"}},o("closeButton").onclick=function(){s("helpText")[0].style.display="none",g=!0};