const fileNames = [
    // LEAVE HERE FOR CLI: Routes Components
    'DocumentationPage',
    'MasterPage',
    'NotFoundPage',
    'PublicPage',
];

const index = fileNames.reduce((dictionary, file) => {
    dictionary[file] = require(`./components/${file}`);
    return dictionary;
}, {});

module.exports = index;
