

const scrollGalleryThumbnails = () => {
    let btnForward = document.getElementById("galleryForwardIcon");
    let btnBackward = document.getElementById("galleryBackwardIcon");
    let thumbnailsContainer = document.getElementById("container-thumbnails");

    btnBackward.onclick = () => {
        thumbnailsContainer.scrollLeft -= 100;
    }

    btnForward.onclick = () => {
        thumbnailsContainer.scrollLeft += 100;
    }
}

const showClickedProductImage = () => {
    let thumbnailItems = document.getElementsByClassName("product-item");
    let productPreviewBox = document.getElementById("productPreviewBox");


    Array.from(thumbnailItems).forEach(function (element) {

        element.addEventListener('click', () => {
            removeClassAttributes(thumbnailItems);
            productPreviewBox.children[0].src = element.children[0].src;
            element.classList.add("active");
        });
    });
}

function removeClassAttributes(thumbnailItems) {
    Array.from(thumbnailItems).forEach(function (element) {
        element.classList.remove("active");
    });
}


var tabs = document.getElementsByClassName("box-body-item");
var tabLinks = document.getElementsByClassName("tab-item");

function showFirstTabItem() {
    let index = 0;
    for (tab of tabs) {
        if (index !== 0) {
            tab.style.display = "none";
        }
        else {
            tabLinks[index].classList.add("active");
        }
        index++;
    }
}

function onClickTab(tabIndex) {
    for (tab of tabs) {
        tab.style.display = "none";
    }

    for (tabLink of tabLinks) {
        tabLink.classList.remove("active");
    }

    tabLinks[tabIndex - 1].classList.add("active");
    tabs[tabIndex - 1].style.display = "block";
}

var productQuantityControl = document.getElementById("productQuantityControl");
var btnQuantityDown = document.getElementById("btnQuantityDown");
var btnQuantityUp = document.getElementById("btnQuantityUp");

function decrementProductQuantity() {
    if (productQuantityControl.value > 1) {
        productQuantityControl.value--;
    }
}

function incrementProductQuantity() {
    productQuantityControl.value++;
}



scrollGalleryThumbnails();
showClickedProductImage();
showFirstTabItem();
