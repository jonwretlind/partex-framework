function markersCategoriesMenu() {
    console.log('===== EXECUTING markers-submenu.js =====')
    // GLOBALS 

    /* ========= READING AND FILTERING MENUS ========== */
    // read relative to public folder
    readFile('./schema/markers-submenu-categories.json', async (data) => {
        let menu = JSON.parse(data);
        let menuHtml = '';
        const categoryMenu = document.getElementById('MarkersCategoryMenu');
        console.log("categoryMenu: ", categoryMenu);
        async function addHTML() {
            for (item in menu.items) {
                var activeFlag;
                if (item == 0) { activeFlag = "active"} else { activeFlag = ""}
                //append the parameter to the end of the url
                let UrlParam = appendParameter(window.location.href, 'subcategory', menu.items[item].subcategory);
                //set the html for the submenu category button
                menuHtml += `<li class='submenu-categories-item ${menu.items[item].className} ${activeFlag}' style='background-image: url("${menu.items[item].imageUrl}");'><a href='${UrlParam}'><div class="label">${menu.items[item].label}</div></a></li>`;
                console.log("link: ", menu.items[item].link);
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
    readFile('./schema/megamenu-category-listings.json', async (data) => {
        console.log("category: ", category,"\ncatLabel: ", catLabel);
        let list = JSON.parse(data);
        let menuHtml = '';
        let listing = Object.values(list);
        console.log(listing);
        let listItems = listing[0][0];
        console.log(listItems);
        const listingsWindow = document.getElementsByClassName('submenu-products-list')[0];
        console.log("listingsWindow: ", listingsWindow);
        async function addHTML() {
            for (item in listItems.WireMarkers) {
                console.log('item: ', item, listItems.WireMarkers[item]);
                menuHtml += `<div class='list-item-container'><div class='submenu-category-listing-item'><a href='${listItems.WireMarkers[item].link}'><div class='submenu-listing-image' style='background-image: url("${listItems.WireMarkers[item].imageUrl}");'></div><div class="label">${listItems.WireMarkers[item].productName}</div></a></div></div>`;
            };

            //add the components to the page
            listingsWindow.innerHTML = "<ul class='submenu-categories'>" + menuHtml + "</ul>";
        }    
        await addHTML();       
    });
}


waitForElement('#MarkersCategoryMenu').then((elm) => {
    markersCategoriesMenu();
    markersCategoriesListings("Markers", "Wire Markers");
    console.log(elm.textContent);
});