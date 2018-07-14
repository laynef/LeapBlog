const fileNames = [
    // LEAVE HERE FOR CLI: Routes Components
    'HomePage',
    'MasterPage',
    'NotFoundPage',
];

const index = fileNames.reduce((dictionary, file) => {
    dictionary[file] = require(`./components/${file}`);
    return dictionary;
}, {});

module.exports = index;
