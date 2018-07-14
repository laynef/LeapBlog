import { routes as R, globals as G } from './pages';
import { kebabCase } from 'lodash';
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
				path: '/about',
				exact: true,
				component: R.AboutUsPage,
            },
            {
                path: '/help',
                exact: true,
                component: R.HelpPage,
            },
			{
				path: '/about/:title',
				component: R.DetailAboutUsPage,
			},
			{
				path: '/contact',
				exact: true,
				component: R.ContactPage,
			},
			{
				path: '/blog',
				exact: true,
				component: R.BlogPage,
			},
			{
				path: '/blog/:params',
				exact: true,
				component: R.DetailBlogPage,
			},
			{
				path: '/services',
				exact: true,
				component: R.ServicePage,
			},
			{
				path: '/what-we-treat',
				exact: true,
				component: R.TreatmentPage,
            },
		]
		.concat(Object.values(G.ServiceInnerPages).map(e => ({
			path: `/services/${kebabCase(e.route)}`,
			exact: true,
			component: e.component,
		})))
		.concat(Object.values(G.TreatmentInnerPages).map(e => ({
			path: `/what-we-treat/${kebabCase(e.route)}`,
			exact: true,
			component: e.component,
		})))
		.map((e) => {
			if (!blackListAnimationRoutes[e.path]) e.component = client ? AnimationWrapper(e.component) : e.component;
			return e;
        })
        .concat([
            {
                path: '*',
                exact: true,
                component: R.NotFoundPage,
            },
        ]),
	},
];
