const fileNames = [
	'description',
	'keywords',
];

const allMethods = fileNames.reduce((acc, item) => {
	// LEAVE HERE FOR CLI: SEO Function
	acc.mains = { ...acc.mains, ...require(`./main/${item}`) };
	acc.publics = { ...acc.publics, ...require(`./public/${item}`) };
	acc.apis = { ...acc.apis, ...require(`./api/${item}`) };
	return acc;
}, {
	// LEAVE HERE FOR CLI: SEO Declares
	mains: {},
	publics: {},
	apis: {},
});

export default allMethods;
