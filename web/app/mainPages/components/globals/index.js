const fileNames = [
    // LEAVE HERE FOR CLI: Globals Components
    'CenteredSection',
    'HeaderSection',
    'TopTitleCard',
    'TwoGrid',
];

const index = fileNames.reduce((dictionary, file) => {
    dictionary[file] = require(`./components/${file}`);
    return dictionary;
}, {});

module.exports = index;
