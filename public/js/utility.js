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
function removeActive(ele) {
    const select = document.querySelector(ele);
    if (select) select.classList.remove("active");
}
// clears all menus
function clearMenu(id) {
    const menu = document.getElementById(id);
    if (menu) { 
        menu.classList.remove('active');
        var children = menu.children;
        for (var child of children) {
            child.classList.remove('active');
        };
    }
}

// get URL Parameter

// global values
    // Get Page Parameters
    const rootURL = "https://partex-framework-b4c35e6a07b4.herokuapp.com/"; // global
    let baseURL, pageURL, pageParams; // globals

    function getPageURL() {
     baseURL = window.location.href;
     pageURL = new URL(baseURL); 
     pageParams = pageURL.searchParams;
     return baseURL;
    }

    // URL parameter functions
    // Get Parameter
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

    //append a URL Parameter
function appendParameter(urlString, param, str) {
    console.log("URL with Params: ", urlString);
    let u = new URL(urlString);
    let params = new URLSearchParams(u.search);
    params.append(param, str);
    let newURL = decodeURIComponent(urlString + "?" + params.toString());
    console.log(" --> new URL with params: ", newURL);
    return newURL;
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

// Timer functions
// timer with pause function
class Timer{
    constructor(callback, delay){
        let myTimer;
        this.resume = function() {
            myTimer = window.setInterval(function() {
                callback();
            }, delay);
        }

        this.pause = function() {
            window.clearInterval(myTimer);
        };
    }
}

