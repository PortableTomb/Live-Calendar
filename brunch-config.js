'use strict';

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app\//,
        'vendor.js': /^node_modules\//
      }
    },

    stylesheets: {
      joinTo: {
        'app.css': /^app\//,
        'vendor.css': /^node_modules\//
      }
    }
  },

  npm: {
    styles: {
      'react-big-calendar': ['lib/css/react-big-calendar.css']
    }
  },

  plugins: {
    babel: {
      presets: ['es2015', 'es2016', 'react', 'stage-1']
    }
  },

  server: {
    command: 'nodemon --ignore app --ignore public server.js'
  }
};
