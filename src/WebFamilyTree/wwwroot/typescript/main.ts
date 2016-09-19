let slider = getId('sliderScale') as HTMLInputElement;
let IsTitleHided:boolean = false;
let titleElement = getId("greetingText") as HTMLHeadingElement;
let titleElementOffsetY = getComputedStyle(titleElement)["margin-top"];
let persons = getClass("singlePerson");
let currentImage: HTMLImageElement = null;
let disablePopupImageHelp:boolean = false;
let scaleText = getClass("scaleNumber")[0] as HTMLSpanElement;
let offsetTop: number = -168;
let canMove: boolean = false;

//Initial settings
titleElement.style.opacity="1";
slider.value="100";

//Handle the zoom action
slider.onchange=function(value)
{
    getClass("scaleNumber")[0].innerHTML = slider.value + "%";
    getTag("main")[0].style.transform = "scale("+parseInt(slider.value)/100+")";
};

(document.querySelectorAll("ul.formats li")[0] as HTMLLIElement).onclick = function()
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "ajaxer.php", true);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
            if(xmlhttp.status == 200) console.log(xmlhttp.responseText);
            else console.log("error: "+ xmlhttp.statusText);
    };
    let formData = new FormData();
    formData.append("htmlToParse", document.documentElement.innerHTML);
    xmlhttp.send(formData);
};

//Handle click to show zoom slider
scaleText.onclick = function(e)
{
    slider.style.display = 'block';
    if(!IsTitleHided)
    {
        IsTitleHided = true;
        HideTheTitle();
    }
}
document.body.ondblclick = function () {
    canMove = !canMove;
}
//Hide the "Make ... digital" text, slowly dragging the text to top
function HideTheTitle()
{
    titleElement.style.marginTop = parseInt(titleElementOffsetY) - 1 + "px";
    titleElementOffsetY = titleElement.style.marginTop;
    titleElement.style.opacity = parseFloat(titleElement.style.opacity)-0.02+"";
    if(parseInt(titleElementOffsetY)>-20)
        setTimeout(function()
        {
            HideTheTitle();
        }, 10);
    else
    {
        titleElement.style.display = "none";
        getTag("main")[0].style.cursor = "move";
    }
};

function handleDragStart(e) {
    console.log(this)
  this.parentElement.parentElement.style.opacity = '0.4';  // this / e.target is the source node.
}

function rotateSettings(elementBase: HTMLElement, elementModify: HTMLElement) {
// ratio is 200 : 403
    let widthBase = parseInt(getComputedStyle(elementBase)["width"]);
    let widthElement = parseInt(getComputedStyle(elementModify)["width"]);
    let heightElement = parseInt(getComputedStyle(elementModify)["height"]);
    elementModify.style.cssText = "display:block;left:calc(50% - " + (widthElement / 2 - 10) + "px); top:-" + (heightElement) + "px;transform-origin:" + (widthElement / 2 - 10) + "px " + (widthBase / 2 + heightElement) + "px;";
    //elementModify.style.cssText = "display:block;left:calc(50% - 77.5px);top: -196px;transform-origin: 77.5px 260px 0px;background-position: 48px 1px;"
};

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}
document.onmousemove = function (e) {
    let rect = getClass("boundingRectangle")[getClass("boundingRectangle").length - 1].getBoundingClientRect();
    if (canMove == false || rect === undefined)
        return;
    console.log(e.pageX);
    let boxCenter = [rect.left + 20, rect.top + 20];
    let angle = Math.atan2(e.pageX - boxCenter[0], - (e.pageY - boxCenter[1])) * (180 / Math.PI);
    getClass("leftTree")[getClass("leftTree").length - 2].style.transform = "rotate(" + angle + "deg)";
};
var cols = document.querySelectorAll('.movePersonCircle');
[].forEach.call(cols, function(col:HTMLElement) {

  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragover', handleDragOver, false);
});

document.onclick = function(e)
{
    
    let infoBlock = e.target as HTMLElement;
    let classOfElement = infoBlock.className;
    if(e.target!=slider && e.target!=scaleText) //hide the slider if we not touching it
        slider.style.display = 'none';
    //Handle the click on the persons holder 
    if(classOfElement === "singlePerson" || classOfElement ==="emptyPersonImage")
    {
        if(!IsTitleHided)
        HideTheTitle();

        if(classOfElement==="emptyPersonImage")
            infoBlock = infoBlock.parentElement;

        let elements = getClass("addTree") as NodeListOf<HTMLDivElement>;
        for(let i=0;i< elements.length;i++) // show the "add tree" buttons
            if(elements[i].className.indexOf("treeShown") === -1)
                elements[i].style.display = "inline-block";
        let evObj = document.createEvent('MouseEvents'); // Send click to the input[type=file]
        evObj.initEvent('click', false, true);
        let inputFile = infoBlock.getElementsByTagName('input')[0] as HTMLInputElement;
        inputFile.dispatchEvent(evObj);
        inputFile.onchange = function(ev)
        {
            let scale = 1;
            if(!inputFile.files || !inputFile.files[0])
                return;      
            let fileReader = new FileReader();
            fileReader.onload = function(e)
            {
                if(disablePopupImageHelp == false)
                    getClass("helpText")[0].style.display="block";
                let image = infoBlock.getElementsByTagName('img')[0] as HTMLImageElement;
                image.src = e.target.result; 
                image.onload = function()
                {
                    image.style.width="256px"
                }
                currentImage = image;
            }
            fileReader.readAsDataURL(inputFile.files[0]);
        }
        return;
    }
    //Trigger the click on info Button, show the are to edit the biography
    if(classOfElement === "infoAdd") 
    {
        BiographyProcess(infoBlock);
        return;
    }
    if (classOfElement.indexOf("addTree") > -1)  // Handle click on the pluses near the person head
    {                                                                                      // By default, it triggers left tree
        let elem = infoBlock.parentElement
            .getElementsByClassName("leftTree")[0] as HTMLDivElement;
        let leftOne: boolean = true;
        if (classOfElement.indexOf("right") > -1)   // But on this line we checking for right
        {
            elem = infoBlock.parentElement
                .getElementsByClassName("rightTree")[0] as HTMLDivElement;
            leftOne = false;
        }                                                                                            //End of triggering the right tree
        elem.style.display = "block";
        infoBlock.className += " treeShown";
        let positions = elem.getBoundingClientRect();
        let dynamicElementWrapper = document.createElement("div");
        dynamicElementWrapper.className = "singlePersonWrapper";
        dynamicElementWrapper.style.position = "absolute";
        if (leftOne)
            dynamicElementWrapper.style.left = positions.left - 80 + "px"
        else
            dynamicElementWrapper.style.left = positions.right - 180 + "px"
        dynamicElementWrapper.style.top = offsetTop + "px";
        offsetTop *= 2;
        let holder = getClass("personHolder")[getClass("personHolder").length - 1] as HTMLDivElement;
        let clone = holder.cloneNode(true) as HTMLDivElement;

        for (let i = 0; i < clone.childElementCount; i++)
        {
            var child = clone.children[i] as HTMLElement;
            let className = child.className;
            child.className = className.replace("treeShown", "");
            if (className == "boundingRectangle") {
                let subchild = child.children[0] as HTMLDivElement;
                for (let i = 0; i < subchild.childElementCount; i++) 
                    subchild.children[i].removeAttribute("style");
                
            }
            if (className.indexOf("leftTree") > -1 || className.indexOf("rightTree") > -1) {
                child.removeAttribute("style");
                rotateSettings(child, child);
            }
            if(className=="singlePerson")
            {
            
                (child.children[1] as HTMLImageElement).src = "images/noperson.svg"; //0 children in release
                (child.children[1] as HTMLImageElement).removeAttribute("style");
            }
        }

        for (let i = 0; i < holder.childElementCount; i++) {
            if (holder.children[i].className == "boundingRectangle") {
                console.log(holder.children[i].children[0]);
                let subchild = holder.children[i].children[0] as HTMLDivElement;
                for (let i = 0; i < subchild.childElementCount; i++) {
                    if (subchild.children[i].hasAttribute("style"))
                        rotateSettings(subchild, subchild.children[i] as HTMLElement);
                }
            }
        }

        dynamicElementWrapper.appendChild(clone);
        getTag("section")[0].appendChild(dynamicElementWrapper);
        console.log(document.getElementsByClassName("rightTree")[1].y);
    }
};
function BiographyProcess(infoBlock: HTMLElement): void
{
        let textarea = infoBlock.parentElement.getElementsByTagName("textarea");
        if(textarea.length>0)
        {
            infoBlock.parentElement.removeChild(textarea[0]);
            return;
        }
        let element = document.createElement("textarea");
        element.innerHTML = "Input some biography/notes here";
        getClass("infoAdd")[0].parentElement.appendChild(element);
}

document.onkeydown = function(e)
{
    if(currentImage==null)
        return ;
    switch(e.key)
    {
        case "ArrowUp":
                (currentImage as HTMLImageElement)
                    .style.marginTop = parseInt(
                    getComputedStyle(currentImage)["margin-top"]
                        ) - 1 + "px";
            break;
        case "ArrowDown":
                (currentImage as HTMLImageElement)
                    .style.marginTop= parseInt(
                    getComputedStyle(currentImage)["margin-top"]
                        ) + 1 + "px";        
            break;
        case "ArrowLeft":
                (currentImage as HTMLImageElement)
                    .style.marginLeft= parseInt(
                    getComputedStyle(currentImage)["margin-left"]
                        ) - 1 + "px";         
            break;
        case "ArrowRight":
                (currentImage as HTMLImageElement)
                    .style.marginLeft= parseInt(
                    getComputedStyle(currentImage)["margin-left"]
                        ) + 1 + "px";         
            break;
        case "+":
                 (currentImage as HTMLImageElement)
                    .style.width= parseInt(
                    getComputedStyle(currentImage)["width"]
                        ) + 1 + "px";                
            break;
        case "-":
                (currentImage as HTMLImageElement)
                    .style.width= parseInt(
                    getComputedStyle(currentImage)["width"]
                        ) - 1 + "px";         
        break;
    }
}

getId("closeButton").onclick = function()
{
    getClass("helpText")[0].style.display = "none";
    disablePopupImageHelp = true;
}

//Helper functions

function getTag(selector: string)
{
    return <NodeListOf<HTMLElement>> document.getElementsByTagName(selector);
}

function getId(selector: string)
{
    return <HTMLElement> document.getElementById(selector);
}

function getClass(selector: string)
{
    return <NodeListOf<HTMLElement>> document.getElementsByClassName(selector);
}