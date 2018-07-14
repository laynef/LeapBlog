const fileNames = [
	'methods',
	'dates',
	'globals',
	'fetch',
	'AnimationWrapper',
	'AppointmentModal',
	'SaveButtonContainer',
	'SaveButtonWrapper',
	'AppointmentModalWrapper',
	'blackListAnimationRoutes',
	'appointmentRoutes',
	'saveButtonRoutes',
];

const allMethods = fileNames.reduce((acc, item) => {
	return { ...acc, ...require(`./methods/${item}`) };
}, {});

export default allMethods;
