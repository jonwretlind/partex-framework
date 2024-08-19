(async function () {
    console.log('===== EXECUTING megamenu.js =====')
    // GLOBALS 
    let submenus = [];

    /* ========= READING AND FILTERING MENUS ========== */
    // read relative to public folder
    readFile('./js/megamenu.json', async (data) => {
        let menu = JSON.parse(data);
        let menuHtml = '';
        let menuContHtml = '';
        const megamenu = document.getElementById('Megamenu');
        const megamenuContainer = document.getElementById('MegamenuContainer');
        async function addHTML() {
            for (item in menu.items) {
                // find any submenus and insert into an array
                if (menu.items[item].submenu) {
                    submenus.push({"item" : item, "label" : menu.items[item].submenu});
                };
                menuHtml += `<li onmouseenter="removeActive('.megamenu-panel'); rollOver('MainmenuButton_${item}', 'MegamenuPanel_${item}', 'MegamenuContainer')" id='MainmenuButton_${item}' class='menu item'><a href='${menu.items[item].link}'>` + menu.items[item].label + "</a></li>";
                menuContHtml += `<div id='MegamenuPanel_${item}' class='megamenu-panel void'>{{ megamenu-panel-content }}</div>`;
            };

            //add the components to the page
            megamenu.innerHTML = "<ul class='menu'>" + menuHtml + "</ul>";
            megamenuContainer.innerHTML = menuContHtml;
        }

        await addHTML()
            .then(
                addSubmenus()
            )
            .then(
                addLabels()
            )
            
    });

    function addSubmenus() {
        // find and add the submenus and their indexes
        let submenuLabel = '';
        let submenuContHtml = '';
        let submenuContainer = []; //the containers for these are in an array
        for(sub in submenus) {
            let submenuID = 'MegamenuPanel_' + submenus[sub].item;
            submenuContainer[sub] = document.getElementById(submenuID);
            submenuLabel = "{{ " + submenus[sub].label + " }}";
            submenuContHtml  = `<div class='megamenu-subpanel' onmouseleave="removeActive('#Megamenu .active')">${submenuLabel}</div>`;
            // add submenu containers
            submenuContainer[sub].innerHTML = submenuContHtml;
        }
    }

    function addLabels() {
        // add label classes to each top-level main menu item AND the submenu panels
        // so that we can identify submenu panels to make visible or hide
        // in MENU ACTIONS
        mainMenuItems = document.querySelectorAll('.menu.item'); //returns nodeList 
        submenuPanels = document.querySelectorAll('.megamenu-panel'); //returns nodeList 
        for (item in submenus) {
            let sub = submenus[item];
            let subIdx = sub.item;
            mainMenuItems[subIdx].classList.add(sub.label);
            submenuPanels[subIdx].classList.add(sub.label);
            submenuPanels[subIdx].classList.remove('void');
        }
    }   
})(); 