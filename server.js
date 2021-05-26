const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// Creates an instance of a server
const server = http.createServer((req, res) => {
  //lodash
  const num = _.random(0, 20);

  const greet = _.once(() => {
    console.log('Hello');
  });

  // set header content type
  res.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', './about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // Send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(`${err.message}`);
      res.end();
    } else {
      // res.write();
      // To pass a singular write you can just use end and write for sending multiple things
      res.end(data);
    }
  });
});

// Sets the server to listen for requests on port 3000
server.listen(3000, 'localhost', () => {
  console.log('Listening for request on port 3000');
});
