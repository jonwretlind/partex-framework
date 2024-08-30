(function () {
    //DEBUG MODE
    const debug = false;
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
        
            console.log("Debug Mode");
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