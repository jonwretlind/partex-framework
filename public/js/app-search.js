// Search component js
(function() {
    console.log("===== EXECUTING app-search.js =====");
    const SearchComponent = document.getElementById('Search');
    const Search = document.getElementById('SearchInput');
        Search.addEventListener('focus', (evt) => {
            console.log("Search Focused.");
            SearchComponent.classList.add('focused');
        });
        Search.addEventListener('blur', (evt) => {
            console.log("Search Un-Focused.");
            SearchComponent.classList.remove('focused');
        });
})();