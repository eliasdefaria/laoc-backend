'use strict';

// Development specific configuration
// ==================================
module.exports = {
  //environment
  env: {
    url: 'https://jive.live', //prod
    //url: 'http://localhost:4200', //test
  },
  // CORS
  allowedOriginsApi: [
    'http://localhost',
    'http://localhost:4200',
    'http://laoceans.org',
    'http://www.laoceans.org'
  ]

};
