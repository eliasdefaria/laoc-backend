'use strict';

// Development specific configuration
// ==================================
module.exports = {
  //environment
  env: {
    //url: 'https://jive.live', //prod
    url: 'http://localhost:4200', //test
  },
  // CORS
  allowedOriginsApi: [
    'http://localhost',
    'http://localhost:4200',
    'https://jive.live',
    'https://www.jive.live',
    'http://jive.live/',
    'http://www.jive.live/',
    '18.144.41.175'
  ]

};
