import { routes as R } from './pages';
import {
	AnimationWrapper,
	blackListAnimationRoutes,
} from '../utils';


export const declareApiRoutes = (client=false) => {
	let routes = [
		{
			component: R.MasterPage,
			routes: [
				{
					path: `/${process.env.BASE_API_URL}/`,
					exact: true,
					component: R.PublicPage,
                },
                // LEAVE HERE FOR CLI: Page Routes Declaration
				{
					path: `/${process.env.BASE_API_URL}/docs`,
                    component: R.DocumentationPage,
                    exact: true,
                },
				{
					path: `/${process.env.BASE_API_URL}/*`,
					component: R.NotFoundPage,
				},
			].map(e => {
				if (!blackListAnimationRoutes[e.path]) e.component = client ? AnimationWrapper(e.component) : e.component;
				return e;
			}),
		},
	];

	return routes;

};
