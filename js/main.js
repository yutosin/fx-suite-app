/**
 * Created by namuha on 5/8/17.
 */

var pads = document.getElementsByClassName("soundPad");
var banks = document.getElementById("banks").getElementsByTagName("li");
var currentPad;
var currentBank = banks[0];

var banksJSON = '{"Bank_A": [' +
    '{"Pad1": "sounds/JAY-DEE%20001.wav"},' +
    '{"Pad2": "sounds/jd%20hat.wav"},' +
    '{"Pad3": "sounds/jdzap395.wav"},' +
    '{"Pad4": "sounds/jdft202.wav"},' +
    '{"Pad5": "sounds/jdft334.wav"},' +
    '{"Pad6": "sounds/jdft479.wav"},' +
    '{"Pad7": "sounds/jdft2270.wav"},' +
    '{"Pad8": "sounds/jdloop118.wav"},' +
    '{"Pad9": "sounds/jdopenhat380.wav"},' +
    '{"Pad10": "sounds/JDsnare2.wav"},' +
    '{"Pad11": "sounds/JDsnare6.wav"},' +
    '{"Pad12": "sounds/jdtams477.wav"}],' +
    '"Bank_B": [' +
    '{"Pad1": "sounds/JAY-DEE%20001.wav"},' +
    '{"Pad2": "sounds/jd%20hat.wav"},' +
    '{"Pad3": "sounds/jdzap395.wav"},' +
    '{"Pad4": "sounds/jdft202.wav"},' +
    '{"Pad5": "sounds/jdft334.wav"},' +
    '{"Pad6": "sounds/jdft479.wav"},' +
    '{"Pad7": "sounds/jdft2270.wav"},' +
    '{"Pad8": "sounds/jdloop118.wav"},' +
    '{"Pad9": "sounds/jdopenhat380.wav"},' +
    '{"Pad10": "sounds/JDsnare2.wav"},' +
    '{"Pad11": "sounds/JDsnare6.wav"},' +
    '{"Pad12": "sounds/jdtams477.wav"}],' +
    '"Bank_C": [' +
    '{"Pad1": "sounds/JAY-DEE%20001.wav"},' +
    '{"Pad2": "sounds/jd%20hat.wav"},' +
    '{"Pad3": "sounds/jdzap395.wav"},' +
    '{"Pad4": "sounds/jdft202.wav"},' +
    '{"Pad5": "sounds/jdft334.wav"},' +
    '{"Pad6": "sounds/jdft479.wav"},' +
    '{"Pad7": "sounds/jdft2270.wav"},' +
    '{"Pad8": "sounds/jdloop118.wav"},' +
    '{"Pad9": "sounds/jdopenhat380.wav"},' +
    '{"Pad10": "sounds/JDsnare2.wav"},' +
    '{"Pad11": "sounds/JDsnare6.wav"},' +
    '{"Pad12": "sounds/jdtams477.wav"}],' +
    '"Bank_D": [' +
    '{"Pad1": "sounds/JAY-DEE%20001.wav"},' +
    '{"Pad2": "sounds/jd%20hat.wav"},' +
    '{"Pad3": "sounds/jdzap395.wav"},' +
    '{"Pad4": "sounds/jdft202.wav"},' +
    '{"Pad5": "sounds/jdft334.wav"},' +
    '{"Pad6": "sounds/jdft479.wav"},' +
    '{"Pad7": "sounds/jdft2270.wav"},' +
    '{"Pad8": "sounds/jdloop118.wav"},' +
    '{"Pad9": "sounds/jdopenhat380.wav"},' +
    '{"Pad10": "sounds/JDsnare2.wav"},' +
    '{"Pad11": "sounds/JDsnare6.wav"},' +
    '{"Pad12": "sounds/jdtams477.wav"}],' +
    '"Bank_E": [' +
    '{"Pad1": "sounds/JAY-DEE%20001.wav"},' +
    '{"Pad2": "sounds/jd%20hat.wav"},' +
    '{"Pad3": "sounds/jdzap395.wav"},' +
    '{"Pad4": "sounds/jdft202.wav"},' +
    '{"Pad5": "sounds/jdft334.wav"},' +
    '{"Pad6": "sounds/jdft479.wav"},' +
    '{"Pad7": "sounds/jdft2270.wav"},' +
    '{"Pad8": "sounds/jdloop118.wav"},' +
    '{"Pad9": "sounds/jdopenhat380.wav"},' +
    '{"Pad10": "sounds/JDsnare2.wav"},' +
    '{"Pad11": "sounds/JDsnare6.wav"},' +
    '{"Pad12": "sounds/jdtams477.wav"}]}';

var banksObj = JSON.parse(banksJSON);

var blob = window.URL || window.webkitURL;
if (!blob) {
    console.log('Your browser does not support Blob URLs :(');
}

for (var i = 0; i < pads.length; i++) {
    var optionContainer = pads[i].getElementsByClassName("optionContainer");
    var icon = optionContainer[0].getElementsByClassName("optionIcon");
    var padIcon = pads[i].getElementsByClassName("padIconContainer")[0];
    var fileIcon = pads[i].getElementsByClassName("menuIcon")[0];
    var imageIcon = pads[i].getElementsByClassName("menuIcon")[1];
    var colorIcon = pads[i].getElementsByClassName("menuIcon")[2];
    var input = optionContainer[0].getElementsByTagName("input")[0];
    var imageInput = optionContainer[0].getElementsByTagName("input")[1];
    var menuFields = optionContainer[0].getElementsByClassName("menuField");

    icon[0].addEventListener("click", optionExpandCollapse);
    pads[i].addEventListener("click", playFX);
    padIcon.addEventListener("animationend", flashAnimation);
    fileIcon.addEventListener("click", inputOpen);
    imageIcon.addEventListener("click", inputOpen2);
    // colorIcon.addEventListener("click", openColorSelect);
    input.addEventListener("change", fileUpload);
    imageInput.addEventListener("change", imageFileUpload);
    pads[i].addEventListener("dragover", handleDragOver);
    pads[i].addEventListener("drop", handleFileSelect);

    for (var j = 0; j < menuFields.length; j++) {
        menuFields[j].addEventListener("mouseenter", highlightOption);
        menuFields[j].addEventListener("mouseleave", unhighlightOption);
    }
}

for (var i = 0; i < banks.length; i++) {
    banks[i].addEventListener("click", changeBank);
}

document.addEventListener("keydown", handleKeyPress);

function flashAnimation() {
    this.classList.toggle("flash");
}

function inputOpen(ev) {
    var input = this.parentElement.parentElement.getElementsByTagName("input")[0];
    input.click();
    ev.stopPropagation();
}

function inputOpen2(ev) {
    var input = this.parentElement.parentElement.getElementsByTagName("input")[1];
    input.click();
    ev.stopPropagation();
}

function fileUpload() {
    var audioEl = this.parentElement.parentElement.parentElement.getElementsByTagName("audio")[0];
    var file = this.files[0],
        fileURL = blob.createObjectURL(file);
    audioEl.src = fileURL;
    audioChanged(this.parentElement.parentElement.parentElement, fileURL);

}

function imageFileUpload() {
    var imageEl = this.parentElement.parentElement.parentElement.getElementsByClassName("padIconContainer")[0].getElementsByTagName("img")[0];
    var file = this.files[0],
        fileURL = blob.createObjectURL(file);
    imageEl.src = fileURL;
}

function highlightOption() {
    this.getElementsByTagName("p")[0].style.color = "#1E7CC9";
    var paths = this.getElementsByTagName("path");
    for (var i = 0; i < paths.length; i++) {
        paths[i].style.fill = "#1E7CC9";
    }
}

function unhighlightOption() {
    this.getElementsByTagName("p")[0].style.color = "#FFFFFF";
    var paths = this.getElementsByTagName("path");
    for (var i = 0; i < paths.length; i++) {
        paths[i].style.fill = "#FFFFFF";
    }
}
//To be added back when I figure out better logic

/*function openColorSelect() {
    var padIcon = this.parentElement.parentElement.parentElement.getElementsByClassName("padIconContainer")[0];
    var colorSelect = this.parentElement.parentElement.parentElement.getElementsByClassName("colorSelection")[0];
    var options = this.parentElement.parentElement;
    var pad = this.parentElement.parentElement.parentElement;
    var optionBG = pad.getElementsByClassName("optionContainer2")[0];
    var colors = colorSelect.getElementsByTagName("div");

    padIcon.style.display = "none";
    colorSelect.style.display = "block";
    options.style.display = "none";
    pad.removeEventListener("click", playFX);
    pad.style.textAlign = "center";
    pad.classList.toggle("active");
    pad.classList.toggle("soundPad");
    optionBG.className += " hidden";

    for(var i = 0; i < colors.length; i++) {
        colors[i].addEventListener("click", changePadColor);
    }
}

function changePadColor() {
    var pad = this.parentElement.parentElement;
    var rgbColorVal = window.getComputedStyle(this,null).getPropertyValue("background-color");
    var hexColorVal = rgbToHex(rgbColorVal);
    pad.style.backgroundColor = hexColorVal;
}

function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}

function rgbToHex(rgb) {
    var bg = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
}*/

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files;

    files = evt.dataTransfer.files;
    var filename = files[0].name;
    var ext = getExtension(filename);

    switch (ext.toLowerCase()) {
        case 'svg':
            var padIcon = this.getElementsByClassName("padIconContainer")[0].getElementsByTagName("img")[0];
            padIcon.src = blob.createObjectURL(files[0]);
            break;
        case 'mp3':
        case 'wav':
        case 'ogg':
            var audioEl = this.getElementsByTagName("audio")[0];
            audioEl.src = blob.createObjectURL(files[0]);

            audioChanged(this, audioEl.src);
            break;
        default:
            break;
    }
}

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function playFX() {
    if (currentPad && (currentPad !== this)) {
        var classList = currentPad.className.split(" ");
        currentPad.className = classList[0] + " " + classList[1] + " " + classList[2];

        if (classList[2] === "bot-col") {
            currentPad.className += " " + classList[3];
        }

        var currentOptionContainer = currentPad.getElementsByClassName("optionContainer")[0];
        var currentIcon = currentOptionContainer.getElementsByClassName("optionIcon")[0];
        var optionBG = currentPad.getElementsByClassName("optionContainer2")[0];
        var optionText = currentOptionContainer.getElementsByTagName("p");
        var menuIcons = currentPad.getElementsByClassName("menuIcon");

        currentIcon.classList.add('hidden');

        if (currentOptionContainer.className.includes("expanded")) {
            var padIcon = currentPad.getElementsByClassName("padIconContainer")[0];
            currentPad.style.textAlign = "center";
            currentOptionContainer.style.textAlign = "right";
            currentOptionContainer.className = "optionContainer collapsed";
            optionBG.className += " hidden";
            padIcon.style.left = "";
            padIcon.style.transform = "translateY(50%)";
            padIcon.classList.toggle("padExtended");

            for(var i = 0; i < optionText.length; i++) {
                optionText[i].style.display = "none";
            }

            for(var i = 0; i < menuIcons.length; i++) {
                menuIcons[i].style.display = "none";
            }
        }
    }
    currentPad = this;
    var padAudio;
    padAudio = this.getElementsByTagName("audio")[0];
    padAudio.play();
    var classList = currentPad.className.split(" ");
    currentPad.className = classList[0] + " " + classList[1] + " " + classList[2];
    if (classList[2] === "bot-col") {
        currentPad.className += " " + classList[3];
    }
    this.className += " active";
    var optionContainer = this.getElementsByClassName("optionContainer")[0];
    var icon = optionContainer.getElementsByClassName("optionIcon")[0];
    icon.classList.remove('hidden');
    var padIcon = this.getElementsByClassName("padIconContainer")[0];
    padIcon.classList.toggle('flash');
}

function optionExpandCollapse(ev) {
    var pad = this.parentElement.parentElement.parentElement;
    var optionContainer = pad.getElementsByClassName("optionContainer")[0];
    var optionBG = pad.getElementsByClassName("optionContainer2")[0];
    var optionText = optionContainer.getElementsByTagName("p");
    var menuIcons = pad.getElementsByClassName("menuIcon");
    var padIcon = pad.getElementsByClassName("padIconContainer")[0];

    if (optionContainer.className.includes("collapsed")) {
        optionContainer.style.textAlign = "left";
        optionContainer.className = "optionContainer expanded";
        optionBG.className = "optionContainer2";
        pad.style.textAlign = "left";
        padIcon.style.left = "30%";
        padIcon.style.transform = "translate(30%, 50%)";
        padIcon.classList.toggle("padExtended");

        for(var i = 0; i < optionText.length; i++) {
            optionText[i].style.display = "inline";
        }

        for(var i = 0; i < menuIcons.length; i++) {
            menuIcons[i].style.display = "inline";
        }
    }

    else {
        optionContainer.style.textAlign = "right";
        optionContainer.className = "optionContainer collapsed";
        optionBG.className += " hidden";

        pad.style.textAlign = "center";
        padIcon.style.left = "";
        padIcon.style.transform = "translateY(50%)";
        padIcon.classList.toggle("padExtended");

        for(var i = 0; i < optionText.length; i++) {
            optionText[i].style.display = "none";
        }

        for(var i = 0; i < menuIcons.length; i++) {
            menuIcons[i].style.display = "none";
        }
    }

    ev.stopPropagation();
}

function changeBank() {
    switch (this.innerText) {
        case 'A':
            currentBank.classList.toggle("activeBank");
            currentBank = this;
            currentBank.classList.toggle("activeBank");

            for (var i = 0; i < pads.length; i++) {
                var audio = pads[i].getElementsByTagName("audio")[0];
                audio.src = banksObj.Bank_A[i]["Pad" + (i + 1)];
            }
            break;
        case 'B':
            currentBank.classList.toggle("activeBank");
            currentBank = this;
            currentBank.classList.toggle("activeBank");

            for (var i = 0; i < pads.length; i++) {
                var audio = pads[i].getElementsByTagName("audio")[0];
                audio.src = banksObj.Bank_B[i]["Pad" + (i + 1)];
            }
            break;
        case 'C':
            currentBank.classList.toggle("activeBank");
            currentBank = this;
            currentBank.classList.toggle("activeBank");

            for (var i = 0; i < pads.length; i++) {
                var audio = pads[i].getElementsByTagName("audio")[0];
                audio.src = banksObj.Bank_C[i]["Pad" + (i + 1)];
            }
            break;
        case 'D':
            currentBank.classList.toggle("activeBank");
            currentBank = this;
            currentBank.classList.toggle("activeBank");

            for (var i = 0; i < pads.length; i++) {
                var audio = pads[i].getElementsByTagName("audio")[0];
                audio.src = banksObj.Bank_D[i]["Pad" + (i + 1)];
            }
            break;
        case 'E':
            currentBank.classList.toggle("activeBank");
            currentBank = this;
            currentBank.classList.toggle("activeBank");

            for (var i = 0; i < pads.length; i++) {
                var audio = pads[i].getElementsByTagName("audio")[0];
                audio.src = banksObj.Bank_E[i]["Pad" + (i + 1)];
            }
            break;
        default:
            break;
    }
}

function audioChanged(pad, audioSrc) {
    var padsArray = Array.prototype.slice.call( pads );
    switch (currentBank.innerText) {
        case 'A':
            var padNumber = padsArray.indexOf(pad) + 1;
            banksObj.Bank_A[(padNumber - 1)]["Pad" + padNumber] = audioSrc;
            console.log(banksObj.Bank_A[(padNumber - 1)]["Pad" + padNumber]);
            break;
        case 'B':
            var padNumber = padsArray.indexOf(pad) + 1;
            banksObj.Bank_B[(padNumber - 1)]["Pad" + padNumber] = audioSrc;
            console.log(banksObj.Bank_B[(padNumber - 1)]["Pad" + padNumber]);
            break;
        case 'C':
            var padNumber = padsArray.indexOf(pad) + 1;
            banksObj.Bank_C[(padNumber - 1)]["Pad" + padNumber] = audioSrc;
            console.log(banksObj.Bank_C[(padNumber - 1)]["Pad" + padNumber]);
            break;
        case 'D':
            var padNumber = padsArray.indexOf(pad) + 1;
            banksObj.Bank_D[(padNumber - 1)]["Pad" + padNumber] = audioSrc;
            console.log(banksObj.Bank_D[(padNumber - 1)]["Pad" + padNumber]);
            break;
        case 'E':
            var padNumber = padsArray.indexOf(pad) + 1;
            banksObj.Bank_E[(padNumber - 1)]["Pad" + padNumber] = audioSrc;
            console.log(banksObj.Bank_E[(padNumber - 1)]["Pad" + padNumber]);
            break;
        default:
            break;
    }
}

function handleKeyPress(e) {
    switch (e.code) {
        case 'KeyQ':
            playFX.call(pads[0]);
            break;
        case 'KeyW':
            playFX.call(pads[1]);
            break;
        case 'KeyE':
            playFX.call(pads[2]);
            break;
        case 'KeyR':
            playFX.call(pads[3]);
            break;
        case 'KeyA':
            playFX.call(pads[4]);
            break;
        case 'KeyS':
            playFX.call(pads[5]);
            break;
        case 'KeyD':
            playFX.call(pads[6]);
            break;
        case 'KeyF':
            playFX.call(pads[7]);
            break;
        case 'KeyZ':
            playFX.call(pads[8]);
            break;
        case 'KeyX':
            playFX.call(pads[9]);
            break;
        case 'KeyC':
            playFX.call(pads[10]);
            break;
        case 'KeyV':
            playFX.call(pads[11]);
            break;
        default:
            break;
    }
}