var faces = {
    happy_2: ['eyes', 'mouthSmile2'],
    happy_3: ['eyes', 'mouthSmile3'],
    meh: ['eyes', 'mouth'],
    laughing: ['eyesLaughing', 'mouthSmile2'],
    surprised:['eyes', 'eyebrowsRaised', 'mouthO'],
    embarassed: ['eyes', 'mouth', 'blush'],
    embarassed_2: ['eyes', 'eyebrowsLowCringe', 'mouth', 'blush'],
    tired: ['eyes','eyebrowsLowCringe','mouth'],
    unconvinced: ['eyes','mouthSlant'],
    distrustful: ['eyes', 'eyebrowsLow', 'mouth'],
    side__eye_1: ['eyesLookLeft', 'eyebrowsLow', 'mouth'],
    side__eye_2: ['eyesLookRight', 'eyebrowsLow', 'mouth'],
    upset: ['eyes', 'mouthUpset'],
    upset_2: ['eyes', 'eyebrowsCringe', 'mouthUpset'],
    horrified: ['eyes', 'mouthHorrified'],
    angry: ['eyes', 'eyebrowsAngry', 'mouth'],
    talking: ['eyes', 'mouthTalking'],
    yelling: ['eyes', 'mouthYelling'],
    sad: ['eyes', 'mouthSad'],
    angry__crying: ['eyesSqueezedShut', 'tears', 'mouthTantrum'],
    evil: ['eyesMonster', 'mouthMonster'],
};

var getFaceSVG = function(someFaceName) {
    var svg = "";
    var list = getValByKey(faces, someFaceName);
    for (var x in list) {
        var k = list[x];
        svg += getValByKey(faceParts,k);
    }
    return svg;
};

var faceParts = {
eyes: '<circle r="2" fill="#000000;" stroke="none" cx="47" cy="40" /><circle r="2" fill="#000000" stroke="none" cx="73" cy="40" />',
eyesLookLeft: '<circle r="2" fill="#000000;" stroke="none" cx="48.5" cy="40" /><circle r="2" fill="#000000" stroke="none" cx="75" cy="40" />',
eyesLookRight: '<circle r="2" fill="#000000;" stroke="none" cx="45.5" cy="40" /><circle r="2" fill="#000000" stroke="none" cx="71" cy="40" />',
eyesSqueezedShut: '<path fill="none" d="M 44,40 50,40 45,37 M 76,40 70,40 75,37 " />',
eyesLaughing: '<path fill="none" d="M 44,42 C 44,38 51,38 51,42 M 69,42 C 69,38 76,38 76,42" />',
eyesMonster: '<g transform="translate(0,-28)"><circle cx="50" cy="68" r="4" fill="#ff5646"/><circle cx="71" cy="69" r="2" fill="#ff5646"/></g>',
eyebrowsRaised: '<path d="M 45,33 h 4 M 71,33 h 4" />',
eyebrowsCringe: '<path d="M 44,37 49,36 M 75.5,37 70.5,36" />',
eyebrowsLowCringe: '<path d="M 44,39 49,38 M 75.5,39 70.5,38" />',
eyebrowsLow: '<path d="M 44,38.5 h 6 M 70,38.5 h 6" />',
eyebrowsAngry: '<path d="M 45,35 50,37 M 75,35 70,37" />',
tears: '<path stroke="#0777F7" stroke-width="3" fill="none" opacity="0.3" d="M 45,42 44,42 42,46 M 75,42 76,42 78,46" />',
mouth: '<path d="M 56,48 h 8" />',
mouthSmile: '<path fill="none" d="M 64,47 A 4,3 0 0 1 56,47" />',
mouthSmile2: '<g transform="translate(0,1)"><path d="M 56,45 C 56,47 57,51 60,51 63,51 64,47 64,45 z" fill="#c38080" /></g>',
mouthSmile3: '<path fill="#c38080" d="M 73.4,44.6 C 73.4,51.7 67.5,57.5 60,57.5 52.5,57.5 46.5,51.7 46.5,44.6 z" />',

mouthSad: '<path transform="translate(0,-1)" fill="none" d="M 58,50 C 58,48 63,48 63,50" />',

mouthUpset: '<g transform="translate(0,1)"><path d="M 56,50 C 56,45 64,45 64,50 z" fill="#c38080"/></g>',
mouthHorrified: '<g transform="translate(0,-4)"><path fill="#c38080" d="M 54,58 C 54,46 66,46 66,58 z" /></g>',
mouthO: '<circle fill="#c38080" r="2" cx="60" cy="49" />',

mouthSlant: '<path d="M 56,50 62.5,51"/>',


mouthTantrum: '<g transform="translate(0,-29)"><path  fill="#c38080" d="M 49,72 C 46,76 46,83 49,87 56,83 63,83 71,87 74,83 74,76 71,72 63,76 56,76 49,72 z" /></g>',
mouthTalking: '<rect fill="#c38080" rx="2" ry="2" width="12" height="4" x="54" y="46" />',
mouthYelling: '<rect fill="#c38080" rx="1" ry="2" width="22" height="10" x="49" y="45" />',
mouthMonster: '<g transform="translate(-3.5,2) scale(1.05,1)" style="fill:#e6e6e6;stroke-linejoin:bevel;stroke-miterlimit:4;"><rect width="28.2" height="10.35" x="46.2" y="44.4" /><path d="M 46.7625,44.8875 50.0625,54.1125 53.025,44.925"/> <path d="M 53.6625,44.8875 56.9625,54.1125 59.925,44.925" /><path d="M 60.5625,44.8875 63.8625,54.1125 66.825,44.925" /><path d="M 67.4625,44.8875 70.7625,54.1125 73.725,44.925" /></g>',
blush: '<circle fill="#dd374d" stroke="none" opacity=".4" r="4" cx="41" cy="46" /><circle fill="#dd374d" stroke="none" opacity=".4" r="4" cx="79" cy="46" />'
};

