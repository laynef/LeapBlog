module.exports = (res, application) => {
    const normalizeAssets = (assets) => {
        return Array.isArray(assets) ? assets : [assets];
    };

    if (res.locals.webpackStats && res.locals.webpackStats.toJson && res.locals.webpackStats.toJson().assetsByChunkName) {
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
        const assets = normalizeAssets(assetsByChunkName[application]);
        return assets.filter(e =>
            // LEAVE HERE FOR CLI: Webpack Regular Expression
             !RegExp('api-app', 'ig').test(e) ||
             !RegExp('main-app', 'ig').test(e) ||
             !RegExp('public-app', 'ig').test(e)).reduce((acc, item) => {
            if (item.endsWith('.js')) acc.js.push(item);
            if (item.endsWith('.css')) acc.css.push(item);
            return acc;
        }, { js: [], css: [] });
    } else {
        return { js: [], css: [] };
    }
};
