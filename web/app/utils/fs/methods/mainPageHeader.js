module.exports = [
    `/${process.env.BASE_MAIN_URL}/`,
].reduce((acculum, item) => {
    acculum[item] = item;
    return acculum;
}, {});
