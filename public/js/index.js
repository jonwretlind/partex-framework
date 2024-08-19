(function () {
    //DEBUG MODE
    const debug = true;

    window.addEventListener("load", (event) => {
        const containersArr = document.getElementsByClassName('container');
        const Grid = document.getElementById('DevModeGrid');
        var html = '';
        for (var i = 0; i < 16; i++) {
            html += '<div class="container"></div>';
        }
        Grid.innerHTML = html;
        if (debug) {
            console.log("Debug Mode");
            for (const container of containersArr) {
                container.classList.add('devmode'); 
            }
            Grid.classList.add('devmode');
        };
    });

})(); 