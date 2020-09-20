// Model

var model = {
    trouserColor:"BDC5C6",
    shoeColor:"BEC2B8",
    skinColor:"A47858",
    shirtColor:"EEE7DF",
    face:"meh",
    hair:"short2",
    hairColor:"2E211D"
};

var setHairFromModel = function() {

    // Get the relevant SVG elements
    var hairEl = g("hair");
    var backHairEl = g("backHair");

    // Clear previous hair styles
    hairEl.innerHTML = "";
    backHairEl.innerHTML = "";

    // Get all data on the hairstyle
    var hairObj = getHairObj(model.hair);

    // Add new SVG
    hairEl.innerHTML = hairObj.svg;
    if (hairObj.backSVG !== undefined) {
        backHairEl.innerHTML = hairObj.backSVG;
    }
    setAllColorsFromModel();
};

var setFaceFromModel = function() {
    var svg = getFaceSVG(model.face);
    g("face").innerHTML = svg;
};

var setAllColorsFromModel = function() {

    // Private function
    var setHairColorFromModel = function() {
        var c = model.hairColor;
        var hairEl = g("hair");
        var childNodes = hairEl.children;
        for (var x in childNodes) {
            if (childNodes[x] instanceof Element) {
                childNodes[x].setAttribute("fill", "#" + c);
            }
        }
        var backHairEl = g("backHair");
        childNodes = backHairEl.children;
        for (var x in childNodes) {
            if (childNodes[x] instanceof Element) {
                childNodes[x].setAttribute("fill", "#" + c);
            }
        }
    };
    g("leftLeg").setAttribute("fill", "#" + model.trouserColor);
    g("rightLeg").setAttribute("fill", "#" + model.trouserColor);
    g("leftShoe").setAttribute("fill", "#" + model.shoeColor);
    g("rightShoe").setAttribute("fill", "#" + model.shoeColor);
    g("leftHand").setAttribute("fill", "#" + model.skinColor);
    g("rightHand").setAttribute("fill", "#" + model.skinColor);
    g("leftArm").setAttribute("fill", "#" + model.shirtColor);
    g("rightArm").setAttribute("fill", "#" + model.shirtColor);
    g("torso").setAttribute("fill", "#" + model.shirtColor);
    g("head").setAttribute("fill", "#" + model.skinColor);
    setHairColorFromModel();
};

// Controllers

var setColorBoxDisplay = function() {
    if (g("colorOfSkin").checked) {
        g("colorBox").jscolor.fromString(model.skinColor);
    }
    else if (g("colorOfShirt").checked) {
        g("colorBox").jscolor.fromString(model.shirtColor);
    }
    else if (g("colorOfTrousers").checked) {
        g("colorBox").jscolor.fromString(model.trouserColor);
    }
    else if (g("colorOfShoes").checked) {
        g("colorBox").jscolor.fromString(model.shoeColor);
    }
    else if (g("colorOfHair").checked) {
        g("colorBox").jscolor.fromString(model.hairColor);
    }
    console.log("Color box display was set");
};

var colorBoxChange = function() {
    var color = g("colorBox").value;

    if (g("colorOfSkin").checked) {
        model.skinColor = color;
    }
    else if (g("colorOfShirt").checked) {
        model.shirtColor = color;
    }
    else if (g("colorOfTrousers").checked) {
        model.trouserColor = color;
    }
    else if (g("colorOfShoes").checked) {
        model.shoeColor = color;
    }
    else if (g("colorOfHair").checked) {
        model.hairColor = color;
    }
    setAllColorsFromModel();
};

var loadAllFaces = function() {
    var html = "<ul>";
    var keys = Object.keys(faces);
    for (var x in keys) {
        var k = keys[x];
        var kNice = k.replace(/__/g, "-");
        kNice = kNice.replace(/_/g, " ");
        html += "<li id='";
        html += k;
        html += "'>";
        html += kNice + "</li>";
    }
    html += "</ul>";
    g("facesScreen").innerHTML = html;
};

var loadAllHair = function() {
    var html = "";
    var svgTop = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='144' height='162'><g transform='scale(1,1)' fill='#8baaf6'>";

    var template = "<div class='hairClicker' id='__NAME__'>__SVG_TOP__ __SVG__ </g></svg><p>__NICE_NAME__</p></div>";

    for (var x in hairStyles) {
        var h = hairStyles[x];
        var newHtml = template.replace(/__NAME__/g, h.n);
        newHtml = newHtml.replace(/__SVG_TOP__/g, svgTop);
        newHtml = newHtml.replace(/__SVG__/g, h.svg);
        newHtml = newHtml.replace(/__NICE_NAME__/g, h.nn);
        html += newHtml;
    }
    g("hairScreen").innerHTML = html;
};

var getSVG = function() {
    var foo = g("svgWrapper").innerHTML;
    download("ComicCharacter.svg", foo);
}

var addListeners = function() {
    g("selectColorToChange").addEventListener("change", function() {
        setColorBoxDisplay();
    });
    g("colorBox").addEventListener("change", function() {
        colorBoxChange();
    });
    g("svgFoo").addEventListener("click", function() {
        getSVG();
    });

    g("facesScreen").addEventListener("click", function(e) {
        model.face = e.target.id;
        setFaceFromModel();
        var el = g("facesScreen");
        var els = getElementsByClassName(el, "highlit");
        for (var x=0; x<els.length; x++) {
            els[x].removeAttribute("class");
        }
        e.target.setAttribute("class", "highlit");
    });

    g("hairScreen").addEventListener("click", function(e) {
        var currentEl = e.target;
        while (true) {
            if (currentEl.hasAttribute("class", "hairClicker")) {
                var hairName = currentEl.id;
                model.hair = hairName;
                var hairObj = getHairObj(hairName);
                setHairFromModel();
                setAllColorsFromModel();
                break;
            }
            currentEl = currentEl.parentElement;
        }
    });

    g("skinColorRecs").addEventListener("click", function(e) {
        model.skinColor = e.target.id;
        setAllColorsFromModel();

        // Un-highlight
        var el = g("skinColorRecs");
        var children = el.childNodes;
        for (var x in children) {
            if (children[x] instanceof Element) {
                children[x].removeAttribute("class");
            }         
        }
        // Re-highlight
        e.target.setAttribute("class","highlit");
        g("colorOfSkin").click(); 
        setColorBoxDisplay();
    });

    g("hairColorRecs").addEventListener("click", function(e) {
        model.hairColor = e.target.id;
        setAllColorsFromModel(); 

        // Un-highlight
        var el = g("hairColorRecs");
        var children = el.childNodes;
        for (var x in children) {
            if (children[x] instanceof Element) {
                children[x].removeAttribute("class");
            }         
        }
        // Re-highlight
        e.target.setAttribute("class","highlit");
        g("colorOfHair").click();
        setColorBoxDisplay();      
    });
    g("showHideFaces").addEventListener("click", function() {
        var el = g("facesScreen");
        if (el.hasAttribute("class")) {
            el.removeAttribute("class");            
        }
        else {
            el.setAttribute("class","noDisplay");
        }
    });
    g("showHideColors").addEventListener("click", function() {
        var el = g("colorsScreen");
        if (el.hasAttribute("class")) {
            el.removeAttribute("class");            
        }
        else {
            el.setAttribute("class","noDisplay");
        }
    });
    g("showHideColorRecs").addEventListener("click", function() {
        var el = g("colorRecsScreen");
        if (el.hasAttribute("class")) {
            el.removeAttribute("class");            
        }
        else {
            el.setAttribute("class","noDisplay");
        }
    });
    g("showHideHair").addEventListener("click", function() {
        var el = g("hairScreen");
        if (el.hasAttribute("class")) {
            el.removeAttribute("class");            
        }
        else {
            el.setAttribute("class","noDisplay");
        }
    });
    g("showHideRemember").addEventListener("click", function() {
        var el = g("rememberScreen");
        if (el.hasAttribute("class")) {
            el.removeAttribute("class");            
        }
        else {
            el.setAttribute("class","noDisplay");
        }
    });
};

var init = function() {
    console.log("Starting init()");
    loadAllFaces();
    loadAllHair();
    setHairFromModel();
    setAllColorsFromModel();
    setColorBoxDisplay();
    setFaceFromModel();
    addListeners();
    g("colorOfHair").click();
    g(model.face).click();
};



