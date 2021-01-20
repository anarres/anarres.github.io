/* 
 * 
 *  The HTML page user interface
 *
*/

COMIC.controllers = {

    refreshPreview: function() {

        var p = COMIC.model.currentPanelIndex;

        // Get rid of any previous greyed-out-ness
        document.getElementById("decreasePanelNum").removeAttribute("class");
        document.getElementById("increasePanelNum").removeAttribute("class");
        document.getElementById("deletePanel").removeAttribute("class");

        // Display current and total panel numbers
        document.getElementById('panelNum').childNodes[0].nodeValue = p + 1;
        document.getElementById('totalPanelCount').childNodes[0].nodeValue = COMIC.model.panels.length;

        // Grey out the buttons that need to be greyed out
        if ((p + 1) == COMIC.model.panels.length) {
            document.getElementById("increasePanelNum").setAttribute("class", "greyedOut");
        }
        else {
            document.getElementById("increasePanelNum").setAttribute("class", "notGreyedOut");
        }
        if (p == 0) {
            document.getElementById("decreasePanelNum").setAttribute("class", "greyedOut");
        }
        else {
            document.getElementById("decreasePanelNum").setAttribute("class", "notGreyedOut");
        }
        if (COMIC.model.panels.length == COMIC.constants.maxPanels) {
            document.getElementById("newPanel").setAttribute("class", "greyedOut");
        }
        else  {
            document.getElementById("newPanel").setAttribute("class", "notGreyedOut");
        }
        if (COMIC.model.panels.length == 1) {
            document.getElementById("deletePanel").setAttribute("class", "greyedOut");
        }
        else {
            document.getElementById("deletePanel").setAttribute("class", "notGreyedOut");
        }
        var char1 = COMIC.model.getChar1();
        if (char1.hasFaces) {
            document.getElementById("showFaces1").setAttribute("class","notGreyedOut");
        }
        else {
            document.getElementById("showFaces1").setAttribute("class","greyedOut");
        }
        var char2 = COMIC.model.getChar2();
        if (char2.hasFaces) {
            document.getElementById("showFaces2").setAttribute("class","notGreyedOut");
        }
        else {
            document.getElementById("showFaces2").setAttribute("class","greyedOut");
        }

        // Display this panel's text
        document.getElementById("character1Text").value = COMIC.model.panels[p].text1;
        document.getElementById("character2Text").value = COMIC.model.panels[p].text2;

        // Display the new preview image
        var svg = COMIC.svg.preview(1);

        document.getElementById("svgGoesHere").innerHTML = svg;
    },

    showScreen: function(n) {
        if (n == 1) {
            document.getElementById("screen2").removeAttribute("class");
            document.getElementById("screen3").removeAttribute("class");
            document.getElementById("screen1").setAttribute("class","current");
        }
        else if (n == 2) {
            document.getElementById("screen1").removeAttribute("class");
            document.getElementById("screen3").removeAttribute("class");
            document.getElementById("screen2").setAttribute("class","current");
        }
        else if (n == 3) {
            document.getElementById("screen1").removeAttribute("class");
            document.getElementById("screen2").removeAttribute("class");
            document.getElementById("screen3").setAttribute("class","current");
        }
    },

    addListeners: function() {

        document.getElementById("titleWrapper").addEventListener("click", function(e) {
            var myid = e.target.id;

            if (myid == "decreasePanelNum") {
                if (COMIC.model.currentPanelIndex > 0) {
                    COMIC.model.currentPanelIndex -= 1;
                    COMIC.controllers.refreshPreview();
                }
            }
            else if (myid == "increasePanelNum") {
                if (COMIC.model.currentPanelIndex + 1 < COMIC.model.panels.length) {
                    COMIC.model.currentPanelIndex += 1;
                    COMIC.controllers.refreshPreview();
                }
            }
            else if (myid == "newPanel") {
                if (COMIC.model.panels.length < COMIC.constants.maxPanels) {
                    var newPanel = { bubble1: "word", bubble2: "word", text1:"Hey look, it's a new panel! Better delete this text and write something else.", text2: "", leftFace: 0, rightFace: 0 };
                    COMIC.model.panels.splice(COMIC.model.currentPanelIndex+1, 0, newPanel);
                    COMIC.model.currentPanelIndex += 1;
                    COMIC.controllers.refreshPreview();
                }
            }
            else if (myid == "deletePanel") {
                if (COMIC.model.panels.length > 1) {
                    COMIC.model.panels.splice(COMIC.model.currentPanelIndex, 1);
                    if (COMIC.model.currentPanelIndex > 0) {
                        COMIC.model.currentPanelIndex -= 1;
                    }
                    COMIC.controllers.refreshPreview();
                }
            }
        }, false);

        document.getElementById("jscolor").addEventListener("change", function() {
            COMIC.model.backgroundColor = "#" + this.value;
            COMIC.controllers.refreshPreview();
        }, false);

        document.getElementById("character1Text").addEventListener("change", function() {
            var maxCharNum = COMIC.constants.maxLineLength * COMIC.constants.maxNumLines;
            COMIC.model.panels[COMIC.model.currentPanelIndex].text1 = this.value.slice(0,maxCharNum);
            COMIC.controllers.refreshPreview();
        }, false);

        document.getElementById("character2Text").addEventListener("change", function() {
            var maxCharNum = COMIC.constants.maxLineLength * COMIC.constants.maxNumLines;
            COMIC.model.panels[COMIC.model.currentPanelIndex].text2 = this.value.slice(0,maxCharNum);
            COMIC.controllers.refreshPreview();
        }, false);

        document.getElementById("previewButtonSet1").addEventListener("click", function(e) {
            var el = e.target;
            var myid = e.target.id;

            if (myid == "selectChar1") {
                if (! el.hasAttribute("class")) {
                    document.getElementById("selectChar2").removeAttribute("class");
                    el.setAttribute("class","selected");
                }
                document.getElementById("charNum").textContent = "1";
                COMIC.controllers.showScreen(2);
            }
            else if (myid == "bubble1") {
                var p = COMIC.model.currentPanelIndex;
                var currentStyle = COMIC.model.panels[p].bubble1;
                if (currentStyle == "thought") {
                    COMIC.model.panels[p].bubble1 = "none";
                }
                else if (currentStyle == "none") {
                    COMIC.model.panels[p].bubble1 = "word";
                }
                else {
                    COMIC.model.panels[p].bubble1 = "thought";
                }
                COMIC.controllers.refreshPreview();
            }
            else if (myid == "showFaces1") {
                COMIC.model.panels[COMIC.model.currentPanelIndex].leftFace += 1;
                if (COMIC.model.panels[COMIC.model.currentPanelIndex].leftFace >= COMIC.svg.faces.length) {
                    COMIC.model.panels[COMIC.model.currentPanelIndex].leftFace = 0;
                }
                COMIC.controllers.refreshPreview();
            }
            else if (myid == "imageFormatPNG") {
                if (COMIC.model.imageType == "SVG") {
                    COMIC.model.imageType = "PNG";
                    document.getElementById("imageFormatSVG").removeAttribute("class");
                    el.setAttribute("class","selected");
                }
            }
            else if (myid == "imageFormatSVG") {
                if (COMIC.model.imageType == "PNG") {
                    COMIC.model.imageType = "SVG";
                    document.getElementById("imageFormatPNG").removeAttribute("class");
                    el.setAttribute("class","selected");
                }
            }
            else if (myid == "saveImage") {
                COMIC.controllers.showScreen(3);
                COMIC.saveImage();
            }
        }, false);

        document.getElementById("previewButtonSet2").addEventListener("click", function(e) {
            var el = e.target;
            var myid = e.target.id;

            if (myid == "selectChar2") {
                if (! el.hasAttribute("class")) {
                    document.getElementById("selectChar1").removeAttribute("class");
                    el.setAttribute("class","selected");
                }
                document.getElementById("charNum").textContent = "2";
                COMIC.controllers.showScreen(2);
            }
            else if (myid == "bubble2") {
                var p = COMIC.model.currentPanelIndex;
                var currentStyle = COMIC.model.panels[p].bubble2;
                if (currentStyle == "thought") {
                    COMIC.model.panels[p].bubble2 = "none";
                }
                else if (currentStyle == "none") {
                    COMIC.model.panels[p].bubble2 = "word";
                }
                else {
                    COMIC.model.panels[p].bubble2 = "thought";
                }
                COMIC.controllers.refreshPreview();
            }
            else if (myid =="showFaces2") {
                COMIC.model.panels[COMIC.model.currentPanelIndex].rightFace += 1;
                if (COMIC.model.panels[COMIC.model.currentPanelIndex].rightFace >= COMIC.svg.faces.length) {
                    COMIC.model.panels[COMIC.model.currentPanelIndex].rightFace = 0;
                }
                COMIC.controllers.refreshPreview();
            }
        }, false);

        document.getElementById("backFrom2").addEventListener("click", function() {
            COMIC.controllers.showScreen(1);
        }, false);

        document.getElementById("backFrom3").addEventListener("click", function() {
            COMIC.controllers.showScreen(1);
            var el = document.getElementById("imageGoesHere");
            if (el.hasChildNodes()) {
                el.removeChild(el.childNodes[0]);
            }
        }, false);
    }
};

// COMIC.imageSelectors: another part of the HTML/CSS user interface

COMIC.imageSelectors = {

    selectCharacter1: function(myID) {
        var myIndex = parseInt( myID.slice(13) );

        // Deselect all other thumbnails
        var myArray = COMIC.utils.getElementsByClassName(document, "character1Selected");
        for (var i=0; i<myArray.length; i++) {
            myArray[i].setAttribute("class", "character1NotSelected");
        }
        // Select this one
        document.getElementById(myID).setAttribute("class", "character1Selected");

        if (document.getElementById("selectChar1").hasAttribute("class")) {
            COMIC.model.character1Index = myIndex;
        }
        else {
            COMIC.model.character2Index = myIndex;
        }
        // Refresh the preview
        COMIC.controllers.refreshPreview();

        // Go back to screen 1
        COMIC.controllers.showScreen(1);
    },

    // Thumbs are loaded after page load so they don't slow it down. Asynchronous!
    loadThumbs: function() {
        var num = COMIC.characters.length;
        var leftParent = document.getElementById("leftCharactersGoHere");

        for (var i=0; i<num; i++) {
            var leftImage = new Image();
            leftImage.id = "leftCharacter" + i;
            leftImage.setAttribute('class','character1NotSelected');

            var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90" height="90">';
            svg += "<g id='character1' stroke='#000' stroke-width='1.2' stroke-linejoin='round' stroke-linecap='round'>";
            // FIXME get this from comicSVG.js

            svg += COMIC.svg.getCharacter(i);

            if (COMIC.characters[i].hasFaces) {
                svg +=  '<circle id="right-eye" cx="45" cy="37.5" r="3" fill="#222" stroke="none" /> <circle id="left-eye" cx="74" cy="37.5" r="3" fill="#222" stroke="none" /> <path id="mouth" d="M 55 49 h 12" stroke="#222" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />';
            }
            svg += "</g>";
            svg += '</svg>';

            var src =  'data:image/svg+xml;utf8, ';
            src += encodeURIComponent(svg);
            leftImage.src = src;

            leftImage.onload = function() {
                this.addEventListener('click', function() {
                    COMIC.imageSelectors.selectCharacter1(this.id);
                }, false);
            }
            leftParent.appendChild(leftImage);
        }
    }
};

COMIC.saveImage = function() {
    var width = COMIC.model.comicWidth();
    var height = COMIC.model.comicHeight();
    var rawSVG = COMIC.svg.fullComic();

    // Set the height of the div that will hold the image
    var divHeight = height;
    var stringHeight = '' + divHeight + 'px';
    document.getElementById('imageContainer').style.height = stringHeight;

    // Put the SVG in the secret svg div
    var hiddenDiv = document.getElementById('hiddenSVG');
    hiddenDiv.style.height = stringHeight;
    hiddenDiv.innerHTML = rawSVG;

    // The hidden svg element
    var svg = hiddenDiv.childNodes[0];

    document.getElementById("description").innerHTML = COMIC.model.description();

    // Save PNG image
    if (COMIC.model.imageType == "PNG") {
        var svgData = new XMLSerializer().serializeToString(svg);
        var canvas = document.createElement( "canvas" );
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        var ctx = canvas.getContext( "2d" );                     
        var img = document.createElement( "img" );
        img.setAttribute("width", width);
        img.setAttribute("height", height);
        img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );

        img.onload = function() {
            ctx.drawImage(img, 0, 0, width, height);
            var myImage = new Image();
            myImage.setAttribute("id", "myImage");
            myImage.setAttribute("width", width);
            myImage.setAttribute("height", height);
            document.getElementById("imageGoesHere").appendChild(myImage);
            myImage.src = canvas.toDataURL("image/png");
        };
    }

    // Save SVG image
    else {
        var myImage = new Image();
        myImage.setAttribute("id", "myImage");
        myImage.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(rawSVG);
        document.getElementById("imageGoesHere").appendChild(myImage);
    }
};
