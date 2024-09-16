// =========== GLOBALS ============
//DEBUG MODE
    let url = getPageURL();
    const debug = pageParams.get('debug'); 
    console.log("URL: ", url, "\nDebug=", debug);

    // SET LOCAL ROOT URL VAR
    //check first time only
    if (!getCookie("rootURL")) { let rootURL;
    (debug)? 
         rootURL = "http://localhost:3000/" : // local dev
         rootURL = "https://partex-framework-b4c35e6a07b4.herokuapp.com/"; // production
        setCookie("rootURL", rootURL, 1);
    }

(function () {  
    // show debugging grid
    var drawDebugGrid = (units) => {
        if (debug) {
            const containersArr = document.getElementsByClassName('container');
            const Grid = document.getElementById('DevModeGrid');
            var html = '';
            for (var i = 0; i < units; i++) {
                html += '<div class="container"></div>';
            }
            Grid.innerHTML = html;
        
            console.log("Debug Mode ON");
            for (const container of containersArr) {
                container.classList.add('devmode'); 
            }
            Grid.classList.add('devmode');
        };
    };
    window.addEventListener("load", drawDebugGrid(16), false);


    // MOBILE
    const mobileBreakpoint = 1024;
    const tabletBreakpoint = 768;
    const phoneBreakpoint = 460;
    const smPhoneBreakpoint = 320;
    const body = document.getElementById('AppBody');
    var setMobileClasses = () => {
        let Wd = body.offsetWidth;
        console.log(" ----- setMobileClasses() ")
        console.log("Body Width: ", Wd);
        if (Wd <= mobileBreakpoint) {
            body.classList.add('mobile'); // add mobile class to largest breakpoint
        }
        if (Wd <= tabletBreakpoint) body.classList.add('tablet');
        if (Wd <= phoneBreakpoint) body.classList.add('phone');
        if (Wd <= smPhoneBreakpoint) body.classList.add('sm-phone');
    };
    window.addEventListener('load',  setMobileClasses, false);
    window.addEventListener('resize', setMobileClasses, false);


})(); 