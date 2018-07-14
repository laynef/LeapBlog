const fileNames = [
    // LEAVE HERE FOR CLI: Data Components
];

const index = fileNames.reduce((dictionary, file) => {
    dictionary[file] = require(`./components/${file}`);
    return dictionary;
}, {});

module.exports = index;
