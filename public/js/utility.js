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
let flag = false; //global
function removeActive(ele) {
    const Promo = document.getElementById("MegamenuPromoSlider");
    Promo.addEventListener('mouseover', function() { console.log("hovering promo"); flag = true });
    Promo.addEventListener('mouseleave', function() { flag = false });
    // jump out of function if user is hovering over a promo slider;
    if (flag == true) { return } else {
        const select = document.querySelector(ele);
        if (select) select.classList.remove("active");
    }; 
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
// set cookies
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
// get cookie values
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }; 
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

