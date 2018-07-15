module.exports = [
    `/${process.env.BASE_MAIN_URL}/forgotten/password`,
].reduce((acculum, item) => {
    acculum[item] = item;
    return acculum;
}, {});
