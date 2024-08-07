function markersCategoriesMenu() {
    console.log('===== EXECUTING markers-submenu.js =====')
    // GLOBALS 

    /* ========= READING AND FILTERING MENUS ========== */
    // read relative to public folder
    readFile('./js/markers-submenu-categories.json', async (data) => {
        let menu = JSON.parse(data);
        let menuHtml = '';
        const categoryMenu = document.getElementById('MarkersCategoryMenu');
        console.log("categoryMenu: ", categoryMenu);
        async function addHTML() {
            for (item in menu.items) {
                menuHtml += `<li class='submenu-categories-item' style='background-image: url("${menu.items[item].imageUrl}");><a href='${menu.items[item].link}'><div class="label">${menu.items[item].label}</div></a></li>`;
            };

            //add the components to the page
            categoryMenu.innerHTML = "<ul class='submenu-categories'>" + menuHtml + "</ul>";
        }    
        await addHTML();       
    });
};

// populates the markers listing window depending on selected category
function markersCategoriesListings(category, catLabel) {
    console.log('===== EXECUTING markersCategoriesListings() =====');
    // GLOBALS 

    /* ========= READING AND FILTERING MENUS ========== */
    // read relative to public folder
    readFile('./js/megamenu-category-listings.json', async (data) => {
        console.log("category: ", category,"\ncatLabel: ", catLabel);
        let list = JSON.parse(data);
        let menuHtml = '';
        let listing = Object.values(list);
        console.log(listing);
        let listItems = listing.category[0].catLabel;
        const listingsWindow = document.getElementsByClassName('submenu-products-list')[0];
        console.log("listingsWindow: ", listingsWindow);
        async function addHTML() {
            for (item in listItems) {
                menuHtml += `<a href='${list.items[item].link}'><div class='submenu-category-listing-item' style='background-image: url("${menu.items[item].imageUrl}");><div><div class="label">${menu.items[item].productName}</div></div></a>`;
            };

            //add the components to the page
            //listingsWindow.innerHTML = "<ul class='submenu-categories'>" + menuHtml + "</ul>";
        }    
        await addHTML();       
    });
}


waitForElement('#MarkersCategoryMenu').then((elm) => {
    markersCategoriesMenu();
    markersCategoriesListings("Markers", "Wire Markers");
    console.log(elm.textContent);
});