import { reduce, each } from 'lodash';

const fileStructure = {
    data: require('./data'),
    globals: require('./globals'),
};

const index = reduce(fileStructure, (dictionary, value, key) => {
    each(value, (v, k) => {
        dictionary[k] = v;
    })
    return dictionary;
}, fileStructure);

module.exports = index;

