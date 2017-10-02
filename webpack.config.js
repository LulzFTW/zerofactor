const path = require("path");

module.exports = {
    entry: {
        content_scripts: "./content_scripts/zerofactor.js",
        options: "./options/options.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    }
};
