const fileNames = [
    // LEAVE HERE FOR CLI: Routes Components
    'ProfilePage',
    'DashboardPage',
    'ForgottenPasswordPage',
    'LoginPage',
    'MasterPage',
    'NotFoundPage',
    'PublicPage',
    'SignUpPage',
];

const index = fileNames.reduce((dictionary, file) => {
    dictionary[file] = require(`./components/${file}`);
    return dictionary;
}, {});

module.exports = index;
