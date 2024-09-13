const express = require('express');
const fs = require('fs');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
//const { pid } = require('process');
const app = express();
const port = 3000;

// Setup SCSS middleware
app.use(sassMiddleware({
  src: path.join(__dirname, '/scss'),
  dest: path.join(__dirname, '/public/css'), 
  debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));
 
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to read a file
const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

// Route to render a page based on a layout JSON
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const layoutPath = path.join(__dirname, 'layouts', `${page}.json`);
  const templateHead = path.join(__dirname, 'templates', 'templateHead.html');
  const templateFoot = path.join(__dirname, 'templates', 'templateFoot.html');
  console.log("layoutpath: ", layoutPath);

  // Parse JSON layout file and replace with HTML components
  // for the {{ }} tags embedded in the HTML
  fs.readFile(layoutPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('Page not found');
    }
    
    const tHead = readFile(templateHead);
    const tFoot = readFile(templateFoot);
    const layout = JSON.parse(data);
    console.log('=========== JSON =============');
    console.log(layout);
    console.log(typeof layout);
    let filteredContent = '';
    let baseHTML = '';
    let finalHTML = '';
    let matches = [];
    let nodesArr = [];

    // create base nodes array
    function traverseNodes(node, depth = 0) {
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          nodesArr.push(key);
          /*if (typeof node[key] === 'object' && node[key] !== null) {
            console.log("Node Depth: ", depth + 1);
            traverseNodes(node[key], depth + 1); // Recursively traverse the nested object
          }*/
        }
      }
      return nodesArr;
    };
    traverseNodes(layout.components);
    console.log('========== NodesArr ==========');
    console.log(nodesArr);
    console.log('==============================');
    
    // regex for the {{ tags }}
    let regex = /\{\{([^}]*)\}\}/g;
    let regex2 = /\{\{\s*([^}]*?)\s*\}\}/g //just the text label

    function getComponent(n) {
      let c = readFile(`public/components/${n}.html`);
      // update matches array with any new embedded {{ tags }}
      let newMatches = c.match(regex);
      matches.concat(newMatches);
      return c;
    }

    // function to filter the components
    function filterHTML(content) {
      //clear filteredContent
      filteredContent = '';
      let label;
      // look for matched {{ tags }} in component
      matches = content.match(regex);
      if (matches === null) {
        return; // if null exit function
      }
      var m = 0; // reset match index m to 0
      while (matches) { //loop as long as there are {{ tag }} matches
        // update matches array
        matches = content.match(regex);
        //filter for the label name without braces
        if (content.match(regex2)) label = regex2.exec(content)[1];
        if (filteredContent) content = filteredContent; //update content
        if ( label && matches ) { 
          if (m > 0) { // not on first pass of loop
            m++; // increment m
            label = regex2.exec(content)[1];; // update label
          }
          filteredContent = content.replace(matches[m], getComponent(label)); //update filteredContent

          // OUTPUT FOR DEBUGGING
          console.log('----------------------------------------');
          console.log('matches Array: ', matches);
          console.log("match #: ", m);
          console.log("label: ", label);      
          //console.log("filteredContent:\n", filteredContent); 
        };
      };
      return filteredContent;
    };

    // create the intial HTML
    for (node in nodesArr) {
      // get the components for the base HTML template
      baseHTML +=  getComponent(nodesArr[node]);;
    };
    // final pass for filtering
    finalHTML =  filterHTML(baseHTML); // filter the html


    // OUTPUT FOR DEBUGGING
    /*
    console.log('======== FINAL HTML ==========');
    console.log(finalHTML);
    console.log('==============================');
    */
    
    res.send(tHead + finalHTML + tFoot);
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
