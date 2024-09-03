function categoriesMenu() {
    console.log('===== EXECUTING submenu.js =====')
    // GLOBALS 

    /* ========= READING AND FILTERING MENUS ========== */
    // read relative to public folder
    readFile('./schema/submenu-categories.json', async (data) => {
        let menu = JSON.parse(data);
        let menuHtml = '';
        const categoryMenu = document.getElementById('CategoryMenu');
        async function addHTML() {
            for (item in menu.items) {
                var activeFlag;
                if (item == 0) { activeFlag = "active"} else { activeFlag = ""};
                //set the html for the submenu category button
                menuHtml += `<li class='submenu-categories-item ${menu.items[item].className} ${activeFlag}' style='background-image: url("${menu.items[item].imageUrl}");' onclick='setSubmenu("${menu.items[item].label}")'><div class="label">${menu.items[item].label}</div></li>`;
            };

            //add the components to the page
            categoryMenu.innerHTML = "<ul class='submenu-categories'>" + menuHtml + "</ul>";
        }    
        await addHTML();       
    });
};

function setSubmenu(sub) {
    console.log("Label: ", sub);
    categoriesListings("Markers", sub);
}
 
// populates the markers listing window depending on selected category
function categoriesListings(category, catLabel) {
    console.log('  -----> categoriesListings()');
    // GLOBALS 

    /* ========= READING AND FILTERING MENUS ========== */
    // read relative to public folder
    readFile('./schema/products-data.json', async (data) => {
        console.log("category: ", category,"\ncatLabel: ", catLabel);
        let list = JSON.parse(data);
        let menuHtml = '';
        let listing = Object.values(list);
        let catId = "Markers"; // initial category index
        let subProdId = "Wire"; // initial product sub-category index
        let listItems = listing[0].Category;
        const listingsWindow = document.getElementsByClassName('submenu-products-list')[0];
        async function addHTML() {
            for (item in listItems[catId][subProdId]) {
                let prodData = listItems[catId][subProdId]; // the data of individual product
                // note: the first parameter is fed into appendParameter
                // the others follow in the paramter string.
                let paramStr = catId + "&sub=" + subProdId + "&uid=" + prodData[item].uid;
                let link = appendParameter(rootURL + "product", "cat", paramStr);
                menuHtml += `<div class='list-item-container'><div class='submenu-category-listing-item'><a href='${link}'><div class='submenu-listing-image' style='background-image: url("${prodData[item].imageUrl}");'></div><div class="label">${prodData[item].productName}</div></a></div></div>`;
            };

            //add the components to the page
            listingsWindow.innerHTML = "<ul class='submenu-categories'>" + menuHtml + "</ul>";
        }    
        await addHTML();       
    });
}


waitForElement('#CategoryMenu').then((elm) => {
    categoriesMenu();
    categoriesListings("Markers", "Wire Markers");
});