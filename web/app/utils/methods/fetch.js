import { AnimationWrapper } from './AnimationWrapper';
import blackListAnimationRoutes from './blackListAnimationRoutes';
import { __CLIENT__ } from './globals';


export function wrapperRoutes(originalRoutes) {
	let wrappedRoutes = originalRoutes;

	const recursiveRoutes = (routes, array=[]) => {
		routes.forEach(e => {
			if (__CLIENT__ && blackListAnimationRoutes[e] !== e.path) e.component = AnimationWrapper(e.component);
			array.push(e);
			if (e.routes) recursiveRoutes(e.routes, array);
		});
		return array;
	};

	wrappedRoutes.routes = recursiveRoutes(wrappedRoutes[0].routes);

	return wrappedRoutes;
};

export function innerWrapperRoutes(originalRoutes) {

	const recursiveRoutes = (routes, array=[]) => {
		routes.forEach(e => {
			if (__CLIENT__ && blackListAnimationRoutes[e] !== e.path) e.component = AnimationWrapper(e.component);
			array.push(e);
			if (e.routes) recursiveRoutes(e.routes, array);
		});
		return array;
	};

	return recursiveRoutes(originalRoutes);
};

export function makeHash(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
