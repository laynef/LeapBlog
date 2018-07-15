import { routes as R } from './pages';
import {
	AnimationWrapper,
	blackListAnimationRoutes,
} from '../utils';


export const declareMainRoutes = (client=false) => {
	let routes = [
		{
			component: R.MasterPage,
			routes: [
				{
					path: `/${process.env.BASE_MAIN_URL}/`,
					exact: true,
					component: R.PublicPage,
                },
                // LEAVE HERE FOR CLI: Page Routes Declaration
				{
					path: `/${process.env.BASE_MAIN_URL}/signup`,
                    component: R.SignUpPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/login`,
                    component: R.LoginPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/forgotten/password`,
                    component: R.ForgottenPasswordPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/profile`,
                    component: R.ProfilePage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/newsfeed`,
                    component: R.DashboardPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/blog`,
                    component: R.BlogPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/new/blog`,
                    component: R.NewBlogPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/friends`,
                    component: R.FollowersPage,
                    exact: true,
                },
                {
					path: `/${process.env.BASE_MAIN_URL}/profile/:id`,
                    component: R.DetailsProfilePage,
                    exact: true,
                },
				{
					path: `/${process.env.BASE_MAIN_URL}/*`,
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
