// This function scrapes the screen for {{ tags}} 
// and filters code added by subcomponents in js

(function () {
    window.addEventListener("load", (event) => {
        const pageHTML = document.body.innerHTML; // all the page HTML
        filterHTML(pageHTML)
        .then(value => { document.body.innerHTML = value })
        .then(value => { // display <main> element only after components are filtered
            value = document.getElementById('Main'); 
            value.classList.add('loaded');
         }
        );
    }); //document load

   async function filterHTML(content) {
      console.log("===== EXECUTING  FilterHTML() =====");
      // GLOBALS
        const regex = /\{\{([^}]*)\}\}/g;
        const regex2 = /\{\{\s*([^}]*?)\s*\}\}/g //just the text label
        //clear filteredContent
        filteredContent = '';
        let label;
        let newMatches;
        let comp;
        // look for matched {{ tags }} in component
        matches = content.match(regex);
        if (matches === null) {
          return; // if null exit function
        }

        var m = 0; // reset match index m to 0

        const getComponent = (label) => {
          return new Promise((resolve) => {
            var rawFile = new XMLHttpRequest();
            var fileUrl = `../components/${label}.html`;
            rawFile.open("GET", fileUrl, true);
            rawFile.send(null);
  
            rawFile.onreadystatechange = function(e) {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                  resolve(rawFile.responseText);
                }
            };
          })
        };

        // ACTIONS
        while (matches) {
          // update matches array
          matches = content.match(regex);
          //filter for the label name without braces
          if (content.match(regex2)) label = regex2.exec(content)[1];
          if (filteredContent) content = filteredContent; //update content
          if ( label && matches ) { 
            await getComponent(label).then(value => { comp = value });
            // update matches array with any new embedded {{ tags }}
            if (comp) newMatches = comp.match(regex);
            matches.concat(newMatches);
            filteredContent = content.replace(matches[m], comp); //update filteredContent

            
            // OUTPUT FOR DEBUGGING
            //console.log('----------------------------------------');
            //console.log('matches Array: ', matches);
          };
        }
      //console.log("====== filtered CONTENT ======\n", filteredContent);
      return filteredContent;
    };

})();