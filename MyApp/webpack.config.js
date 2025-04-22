const path = require('path');

module.exports = {
    entry: {
        feed: './wwwroot/js/feed.js',
        gallery: "./wwwroot/js/gallery.js",
        login: "./wwwroot/js/userlogin.js",
        register: "./wwwroot/js/register.js",
    },
    output: {
        filename: '[name].js',
        //path: path.resolve(__dirname, 'main'),
        path: path.resolve('./wwwroot/js/', 'dist'),
    },
    mode: "development"
};