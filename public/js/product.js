(function() {
    console.log("===== EXECUTING product.js =====");
    // Product page base functions
    // Get parameter values
    let url = getPageURL();
    const prodID = pageParams.get('uid'); // returns '1'
    console.log("URL: ", url, "\nProduct UID: ", prodID);
})();