import { routes as R } from './pages';
import { AnimationWrapper, blackListAnimationRoutes } from '../utils';


export const declarePublicRoutes = (client=false) => [
	{
		component: R.MasterPage,
		routes: [
			{
				path: '/',
				exact: true,
				component: R.HomePage,
            },
            // LEAVE HERE FOR CLI: Page Routes Declaration
            {
                path: '*',
                exact: true,
                component: R.NotFoundPage,
            },
        ].map((e) => {
			if (!blackListAnimationRoutes[e.path]) e.component = client ? AnimationWrapper(e.component) : e.component;
			return e;
        }),
	},
];
