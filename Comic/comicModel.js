/* 
 * 
 *  The model: the info required to construct the comic.
 *
*/

var COMIC = {
 
// COMIC.constants: values to be set by the website administrator

constants: {
    devMode: false,

    defaultPreviewScaleFactor: 0.8,
    defaultScaleFactor: 1.0,
    maxPanels: 8,
    panelWidth: 400,
    panelHeight: 266,
    spaceBetweenPanels: 10,

    // FIXME rename this to verticalSpaceAbovePanel
    comicVerticalSpace: 10,
    previewVerticalSpace: 0,

    // FIXME rename this to panelHorizontalSpace
    comicHorizontalSpace: 10,
    previewHorizontalSpace: 0,
    comicBackgroundColor: 'fff',
    creditsColor: '444',
    metadataHeight: 25,

    // Characters
    character1X: 45,
    character2X: 235,
    characterY: 146,
    face1X: 0,
    face2X: 0,
    faceY: -2,

    // Text bubbles
    bubble1X: 11,
    bubble2X: 209,
    bubbleY: 5,
    bubbleWidth: 184,
    bubbleHeights: [0, 35, 50, 65, 85, 105, 120, 130, 130, 130],
    bubbleStyle: 'fill="#fff" stroke="#222" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"',
    bubbleCornerRadius: 4,
    stemHeight: 66,

    // Dialogue
    text1X: 18,
    text2X: 216,
    textY: 23,
    maxLineLength: 20,
    maxNumLines: 7,
    lineHeight: 17,
    textStyle: "font-family='Arial, sans-serif' font-size='14px' stroke='none'",

    bottomText: "Made at https://anarres.github.io/Comic/"

},      // End of COMIC.constants

 // COMIC.model: values to be edited by the user (thru the HTML user interface)

model: {

    imageType: "PNG",
    backgroundColor: "#dddddd",
    character1Index: 14,
    character2Index: 19,
    panels: [ 
         {
            bubble1: "word",
            bubble2: "word",
            leftFace: 15,
            rightFace: 2,
            text1:"You can use this website to make a comic!! Just type in the grey text, then click outside the box.",
            text2: "Try clicking the buttons at the top and at the sides to choose the panel, character, word bubble, or facial expression!"
        },
        {
            bubble1: "word",
            bubble2: "thought",
            leftFace: 3,
            rightFace: 4,
            text1:"There are a few different characters to choose from...", 
            text2: "But Pterodactyl is the best one, obviously."
        },
    ],
    currentPanelIndex: 0,

    comicWidth: function() {
        return COMIC.constants.panelWidth + 2 * COMIC.constants.comicHorizontalSpace;
    },

    comicHeight: function() {
        n = COMIC.model.panels.length;
        return n*(COMIC.constants.panelHeight + COMIC.constants.comicVerticalSpace) + COMIC.constants.metadataHeight;


        //return n * (2*COMIC.constants.comicVerticalSpace + COMIC.constants.panelHeight) + COMIC.constants.metadataHeight;
    },







    madeAtY: function() {
        // FIXME
        var foo = COMIC.model.comicHeight();
        return foo-10;
    },







    getChar1: function() {
        return COMIC.characters[COMIC.model.character1Index];
    },
    getChar2: function() {
        return COMIC.characters[COMIC.model.character2Index];
    },

    description: function() {
        var c1Desc = COMIC.characters[COMIC.model.character1Index].desc;
        var c2Desc = COMIC.characters[COMIC.model.character2Index].desc;
        var c1Desc2 = COMIC.utils.capitalise(COMIC.characters[COMIC.model.character1Index].desc2);
        var c2Desc2 = COMIC.utils.capitalise(COMIC.characters[COMIC.model.character2Index].desc2);
        if (c1Desc2 === c2Desc2) {
            c1Desc2 += " 1";
            c2Desc2 += " 2";
        }
        var out = "<strong>Image description:</strong> A comic with two characters: C1.DESC; and C2.DESC. ";
        out = out.replace(/C1.DESC/g, c1Desc);
        out = out.replace(/C2.DESC/g, c2Desc);
        var halfPanel = "<br>DESC2THINKS TEXT ";

        for (var i=0; i<COMIC.model.panels.length; i++) {

            // Character 1
            var p1 = halfPanel;
            p1 = p1.replace(/DESC2/g, c1Desc2);
            if (COMIC.model.panels[i].bubble1 == "thought") {
                p1 = p1.replace(/THINKS/g, " (thinks):");
            }
            else {
                p1 = p1.replace(/THINKS/g, ":");
            }
            p1 = p1.replace(/TEXT/g, COMIC.model.panels[i].text1);

            // Character 2
            var p2 = halfPanel;
            p2 = p2.replace(/DESC2/g, c2Desc2);
            if (COMIC.model.panels[i].bubble2 == "thought") {
                p2 = p2.replace(/THINKS/g, " (thinks):");
            }
            else {
                p2 = p2.replace(/THINKS/g, ":");
            }
            p2 = p2.replace(/TEXT/g, COMIC.model.panels[i].text2);

            out += p1;
            out += p2;
        }
        return out;
    }
},      // End of COMIC.model

init: function() {
    document.getElementById("panelNum").value = "1";
    COMIC.model.previewScaleFactor = COMIC.constants.defaultPreviewScaleFactor;
    COMIC.model.scaleFactor = COMIC.constants.defaultScaleFactor;
    COMIC.controllers.addListeners();
    COMIC.model.backgroundColor = "#" + document.getElementById("jscolor").value;
    COMIC.controllers.refreshPreview();
    COMIC.imageSelectors.loadThumbs();

    // Select the characters
    var leftID = "leftCharacter" + COMIC.model.character1Index;
    document.getElementById(leftID).setAttribute("class", "character1Selected");

    var rightID = "rightCharacter" + COMIC.model.character2Index;
    document.getElementById(rightID).setAttribute("class", "character2Selected");
},

// COMIC.utils

utils: {

    capitalise: function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    },

    // Returns an array of substrings, one per line
    textFoo: function(text, maxLineLength, maxNumLines) {

        if (text == "" || text == " ") {
            return [];
        }

        var stringArray = [];                               // stringArray will hold substrings, one per line
        var chunks = text.split(/\n\r?/g);        // Split input text by newline characters
        while (1===1) {

            if( (stringArray.length >= maxNumLines) || (chunks.length <= 0) ) { break; }

            var chunk = chunks.shift();
            if ( chunk.length <= maxLineLength ) {      // If it is short enuf, add it as a line - deal with chunk
                stringArray.push(chunk);
            }
            else {                                     // Deal with longer chunk
                var myNewArray = COMIC.utils.dealWithLongChunk(chunk, maxLineLength);
                for( var i=0; i<myNewArray.length; i++ ) {
                    stringArray.push(myNewArray[i]);
                    if (stringArray.length >= maxNumLines) { break; }
                }
            }
        }
        return stringArray;
    },

    // Takes a chunk, breaks into words and the reconnects them into 
    // line-sized segments, and returns an array
    dealWithLongChunk: function(chunk) {

        var BUBBLE_MAX_CHARS_PER_LINE = COMIC.constants.maxLineLength;

        var chunkyWordsInitial = chunk.split(" ");
        var chunkyWords = [];
        var lineArray = [];
        var c = 0;
        var newLine = "";
        var testLine =  "";

        // Make sure all words in chunkyWords have lenght less than BUBBLE_MAX_CHARS_PER_LINE
        for (var i=0; i<chunkyWordsInitial.length; i++) {
            if (chunkyWordsInitial[i].length <= BUBBLE_MAX_CHARS_PER_LINE) {
                chunkyWords.push(chunkyWordsInitial[i]);
            }
            else {
                var stopMe = 0;
                var longWord = chunkyWordsInitial[i];
                while (stopMe===0) {
                    if (longWord.length <= BUBBLE_MAX_CHARS_PER_LINE) {
                        chunkyWords.push(longWord);
                        stopMe = 1;
                    }
                    else {
                        var newWord = longWord.slice(0,BUBBLE_MAX_CHARS_PER_LINE);
                        longWord = longWord.slice(BUBBLE_MAX_CHARS_PER_LINE, longWord.length);
                        chunkyWords.push(newWord);
                    }
                }
            }
        }
        while (chunkyWords.length > 0) {
            if (testLine==="") {
                testLine += chunkyWords[0];
                testLine += " ";
            }
            // Test line not (yet) too long
            if (testLine.length <= (BUBBLE_MAX_CHARS_PER_LINE+1)) {
                newLine += chunkyWords.shift();

                if (chunkyWords.length===0) {
                    lineArray[c] = newLine;
                    c += 1;
                }
                else {
                newLine += " ";
                testLine += chunkyWords[0];
                testLine += " ";
                }
            }
            // Test line too long. 
            else {
                lineArray[c] = newLine;
                testLine = "";
                newLine = "";
                c += 1;
            }
        }
        return lineArray;
    },

    getElementsByClassName: function(node,classname) {
      if (node.getElementsByClassName) { // use native implementation if available
        return node.getElementsByClassName(classname);
      } else {
        return (function getElementsByClass(searchClass,node) {
            if ( node == null )
              node = document;
            var classElements = [],
                els = node.getElementsByTagName("*"),
                elsLen = els.length,
                pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

            for (i = 0, j = 0; i < elsLen; i++) {
              if ( pattern.test(els[i].className) ) {
                  classElements[j] = els[i];
                  j++;
              }
            }
            return classElements;
        })(classname, node);
      }
    }
}       // End of COMIC.utils

};      // End of var COMIC
