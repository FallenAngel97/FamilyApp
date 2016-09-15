var slider = getId('sliderScale');
var IsTitleHided = false;
var titleElement = getId("greetingText");
var titleElementOffsetY = getComputedStyle(titleElement)["margin-top"];
var persons = getClass("singlePerson");
var currentImage = null;
var disablePopupImageHelp = false;
var scaleText = getClass("scaleNumber")[0];
//Initial settings
titleElement.style.opacity = "1";
slider.value = "100";
//Handle the zoom action
slider.onchange = function (value) {
    getClass("scaleNumber")[0].innerHTML = slider.value + "%";
    getTag("main")[0].style.transform = "scale(" + parseInt(slider.value) / 100 + ")";
};
document.querySelectorAll("ul.formats li")[0].onclick = function () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "ajaxer.php", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4)
            if (xmlhttp.status == 200)
                console.log(xmlhttp.responseText);
            else
                console.log("error: " + xmlhttp.statusText);
    };
    var formData = new FormData();
    formData.append("htmlToParse", document.documentElement.innerHTML);
    xmlhttp.send(formData);
};
//Handle click to show zoom slider
scaleText.onclick = function (e) {
    slider.style.display = 'block';
    if (!IsTitleHided) {
        IsTitleHided = true;
        HideTheTitle();
    }
};
//Hide the "Make ... digital" text, slowly dragging the text to top
function HideTheTitle() {
    titleElement.style.marginTop = parseInt(titleElementOffsetY) - 1 + "px";
    titleElementOffsetY = titleElement.style.marginTop;
    titleElement.style.opacity = parseFloat(titleElement.style.opacity) - 0.02 + "";
    if (parseInt(titleElementOffsetY) > -20)
        setTimeout(function () {
            HideTheTitle();
        }, 10);
    else {
        titleElement.style.display = "none";
        getTag("main")[0].style.cursor = "move";
    }
}
;
function handleDragStart(e) {
    console.log(this);
    this.parentElement.parentElement.style.opacity = '0.4'; // this / e.target is the source node.
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
    return false;
}
var cols = document.querySelectorAll('.movePersonCircle');
[].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragover', handleDragOver, false);
});
document.onclick = function (e) {
    var infoBlock = e.target;
    var classOfElement = infoBlock.className;
    if (e.target != slider && e.target != scaleText)
        slider.style.display = 'none';
    //Handle the click on the persons holder 
    if (classOfElement === "singlePerson" || classOfElement === "emptyPersonImage") {
        if (!IsTitleHided)
            HideTheTitle();
        if (classOfElement === "emptyPersonImage")
            infoBlock = infoBlock.parentElement;
        var elements = getClass("addTree");
        for (var i = 0; i < elements.length; i++)
            if (elements[i].className.indexOf("treeShown") === -1)
                elements[i].style.display = "inline-block";
        var evObj = document.createEvent('MouseEvents'); // Send click to the input[type=file]
        evObj.initEvent('click', false, true);
        var inputFile_1 = infoBlock.getElementsByTagName('input')[0];
        inputFile_1.dispatchEvent(evObj);
        inputFile_1.onchange = function (ev) {
            var scale = 1;
            if (!inputFile_1.files || !inputFile_1.files[0])
                return;
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                if (disablePopupImageHelp == false)
                    getClass("helpText")[0].style.display = "block";
                var image = infoBlock.getElementsByTagName('img')[0];
                image.src = e.target.result;
                image.onload = function () {
                    image.style.width = "256px";
                };
                currentImage = image;
            };
            fileReader.readAsDataURL(inputFile_1.files[0]);
        };
        return;
    }
    //Trigger the click on info Button, show the are to edit the biography
    if (classOfElement === "infoAdd") {
        BiographyProcess(infoBlock);
        return;
    }
    if (classOfElement.indexOf("addTree") > -1) {
        var elem = infoBlock.parentElement
            .getElementsByClassName("leftTree")[0];
        var leftOne = true;
        if (classOfElement.indexOf("right") > -1) {
            elem = infoBlock.parentElement
                .getElementsByClassName("rightTree")[0];
            leftOne = false;
        } //End of triggering the right tree
        elem.style.display = "block";
        infoBlock.className += " treeShown";
        var positions = elem.getBoundingClientRect();
        var dynamicElementWrapper = document.createElement("div");
        dynamicElementWrapper.className = "singlePersonWrapper";
        dynamicElementWrapper.style.position = "absolute";
        if (leftOne)
            dynamicElementWrapper.style.left = positions.left - 80 + "px";
        else
            dynamicElementWrapper.style.left = positions.right - 180 + "px";
        dynamicElementWrapper.style.top = positions.top - positions.bottom + 40 + "px";
        var clone = document.getElementsByClassName("personHolder")[0].cloneNode(true);
        for (var i = 0; i < clone.children.length; i++) {
            var child = clone.children[i];
            var className = child.className;
            child.className = className.replace("treeShown", "");
            if (className.indexOf("Tree") > -1 && child.nodeName == "IMG") {
                child.removeAttribute("style");
            }
            if (className == "singlePerson") {
                child.children[1].src = "images/noperson.svg"; //0 children in release
                child.children[1].removeAttribute("style");
            }
        }
        dynamicElementWrapper.appendChild(clone);
        getTag("section")[0].appendChild(dynamicElementWrapper);
        console.log(document.getElementsByClassName("rightTree")[1].y);
    }
};
function BiographyProcess(infoBlock) {
    var textarea = infoBlock.parentElement.getElementsByTagName("textarea");
    if (textarea.length > 0) {
        infoBlock.parentElement.removeChild(textarea[0]);
        return;
    }
    var element = document.createElement("textarea");
    element.innerHTML = "Input some biography/notes here";
    getClass("infoAdd")[0].parentElement.appendChild(element);
}
document.onkeydown = function (e) {
    if (currentImage == null)
        return;
    switch (e.key) {
        case "ArrowUp":
            currentImage
                .style.marginTop = parseInt(getComputedStyle(currentImage)["margin-top"]) - 1 + "px";
            break;
        case "ArrowDown":
            currentImage
                .style.marginTop = parseInt(getComputedStyle(currentImage)["margin-top"]) + 1 + "px";
            break;
        case "ArrowLeft":
            currentImage
                .style.marginLeft = parseInt(getComputedStyle(currentImage)["margin-left"]) - 1 + "px";
            break;
        case "ArrowRight":
            currentImage
                .style.marginLeft = parseInt(getComputedStyle(currentImage)["margin-left"]) + 1 + "px";
            break;
        case "+":
            currentImage
                .style.width = parseInt(getComputedStyle(currentImage)["width"]) + 1 + "px";
            break;
        case "-":
            currentImage
                .style.width = parseInt(getComputedStyle(currentImage)["width"]) - 1 + "px";
            break;
    }
};
getId("closeButton").onclick = function () {
    getClass("helpText")[0].style.display = "none";
    disablePopupImageHelp = true;
};
//Helper functions
function getTag(selector) {
    return document.getElementsByTagName(selector);
}
function getId(selector) {
    return document.getElementById(selector);
}
function getClass(selector) {
    return document.getElementsByClassName(selector);
}
