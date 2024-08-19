// GLOBAL UTILITY FUNCTIONS
// must be accessible by page DOM, so not must not be encapsulated
// and must be loaded at top of pages in head
async function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};

function rollOver(eleId, targetID, targetID2) {
    const ele = document.getElementById(eleId);
    if (targetID)  {const target = document.getElementById(targetID); target.classList.add('active');}
    if (targetID2) {const target2 = document.getElementById(targetID2); target2.classList.add('active');}
    ele.classList.add('active');
}
function rollOut(eleId, targetID, targetID2) {
    const ele = document.getElementById(eleId);
    if (targetID)  {const target = document.getElementById(targetID); target.classList.remove('active');}
    if (targetID2) {const target2 = document.getElementById(targetID2); target2.classList.remove('active');}
    ele.classList.remove('active');
}
// removes 'active' from a set of elements defined by a class
function removeActive(className) {
    const childrens = document.querySelectorAll(className);
    childrens.forEach(function(elem) {
      elem.classList.remove("active");
    });
}

// function to wait for a specific element to be loaded before executing 
// another javascript function
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

