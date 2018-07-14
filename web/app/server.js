import { kebabCase, reduce } from 'lodash';

import fs from 'fs';
import path from 'path';
require('dotenv').load({ path: path.join(__dirname, '..', '.env') });

import Express from 'express';
import cors from 'cors';
import http from 'http';
import spdy from 'spdy';
import multer from 'multer';
import favicon from 'serve-favicon';
import compression from 'compression';
import morgan from 'morgan';
import parser from 'body-parser';
import sess from 'express-session';
import helmet from 'helmet';
import csrf from 'csurf';

import React from 'react';
import ReactDOM from 'react-dom/server';
import createStore from './redux/store';
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

// LEAVE HERE FOR CLI: DECLARE APPLICATION ROUTES
import { declareMainRoutes } from './mainPages/routes';
import { declarePublicRoutes } from './publicPages/routes';
import { declareApiRoutes } from './apiPages/routes';

import {
// LEAVE HERE FOR CLI: APPLICATION SEO
    mains,
    publics,
    apis,
} from './seo';

import sourceMapSupport from 'source-map-support';

import {
    getFilePathNames,
    makeHash,
} from './utils/fs';


const HashId = makeHash(40);
const pathName = path.join(__dirname, '..');

const listenServer = (app, openssl) => {
	const server = spdy.createServer(openssl, app);

	http.createServer((req, res) => {
		res.writeHead(301, {"Location": `https://${req.headers.host}${req.url}`});
		res.end();
	}).listen(80);

	server.listen(443, (err) => {
		if (err) console.error(err);

		console.info('----\n==> ✅  Your app is running, talking to API server on %s.', process.env.API_URL);
		console.info('==> 💻  Open %s in a browser to view the app.', process.env.FRONTEND_URL);
		if (process.env.NODE_ENV !== 'production') console.info('==> 💻  Webpack running...');
	});
};

const openssl = {
	key: fs.readFileSync(`${__dirname}/../openssl/leap-frog-app-${process.env.KEY_ENV || 'development'}-key.pem`),
	cert: fs.readFileSync(`${__dirname}/../openssl/leap-frog-app-${process.env.KEY_ENV || 'development'}-cert.pem`),
	ca: fs.readFileSync(`${__dirname}/../openssl/leap-frog-app-${process.env.KEY_ENV || 'development'}-csr.pem`),
	dhparam: fs.readFileSync(`${__dirname}/../openssl/leap-frog-app-${process.env.KEY_ENV || 'development'}-dh.pem`),
	requestCert: false,
	rejectUnauthorized: false,
	secureOptions: 'SSL_OP_NO_SSLv3' | 'SSL_OP_NO_SSLv2',
};


// Express servers
const app = new Express();

const store = createStore();
const protection = csrf();

// Middleware
app.enable('trust proxy');
app.enabled('trust proxy');
app.use(helmet({
    noCache: process.env.NODE_ENV !== 'production',
}));
app.use(helmet.hsts({
    maxAge: 31536000000,
    includeSubdomains: true,
    force: true,
}));
app.use(cors({
    origin: '*',
}));
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(parser.raw());
app.use(compression({ level: 9 }));
app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'pug');
app.use('/assets', Express.static(path.join(__dirname, '..', 'assets')));
app.use(favicon(path.join(__dirname, '..', 'assets','img','favicon.ico')));
app.use(sess({
    secret: process.env.WEB_SECRET,
    saveUninitialized: true,
    resave: false,
    name: 'Leap Blog',
    cookie: {
        secure: true,
        token: null,
    },
}));
app.use(protection);
app.use((req, res, next) => {
    req.session.cookie.token = req.csrfToken();
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.post('/set', protection, (req, res) => {
    if (req.body.token) {
        req.session.user[req.session.id] = req.body.user;
        req.session.redux[req.session.user[req.session.id]] = Object.assign({}, req.session.redux[req.session.user[req.session.id]], req.body.redux);
        req.session.token[req.session.user[req.session.id]] = req.body.token;
    } else {
        delete req.session.user[req.session.id];
        delete req.session.redux[req.session.user[req.session.id]];
        delete req.session.token[req.session.user[req.session.id]];
    }
    res.sendStatus(201);
});

if (process.env.NODE_ENV !== 'production') {
    const webpackConfig = require(`${pathName}/webpack/client.dev.config`);
    const compiler = require('webpack')(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
        quiet: true,
        lazy: false,
        contentBase: path.join(__dirname, '..', 'assets', 'dist'),
        stats: {
            context: path.join(__dirname, '..', 'assets', 'dist'),
            assets: true,
            cachedAssets: true,
        },
    }));
    app.use(require('webpack-hot-middleware')(compiler, {
        path: '/__webpack_hmr',
        dynamicPublicPath: webpackConfig.output.publicPath,
        heartbeat: 10 * 1000,
        timeout: 20 * 1000,
        reload: true,
    }));
}

// Public Pages
app.use((req, res, next) => {
    // LEAVE HERE FOR CLI: APPLICATION REGEX
    let regexMain = new RegExp(`/${process.env.BASE_MIAN_URL}/`, 'ig');
    let regexApi = new RegExp(`/${process.env.BASE_API_URL}/`, 'ig');
    if (
        // LEAVE HERE FOR CLI: APPLICATION REGEX
        !regexMain.test(req.url) &&
        !regexApi.test(req.url)
    ) {
        if (process.env.NODE_ENV !== 'production') sourceMapSupport.install();

        req.session.user = req.session.user  === undefined ? {} : req.session.user;
        req.session.redux = req.session.redux  === undefined ? {} : req.session.redux;
        req.session.token = req.session.token  === undefined ? {} : req.session.token;

        let redux = !req.session.user[req.session.id] || !req.session.redux[req.session.user[req.session.id]] ? store.getState() : req.session.redux[req.session.user[req.session.id]];
        let token = !req.session.user[req.session.id] || !req.session.token[req.session.user[req.session.id]] ? null : req.session.token[req.session.user[req.session.id]];

        const userStore = createStore(redux);
        let context = {};
        const component = (
            <Provider store={userStore}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(declarePublicRoutes(false))}
                </StaticRouter>
            </Provider>
        );

        let id = HashId;

        res.status(200).render('public', {
            hashId: id,
            partials: process.env.BACKEND_FRAMEWORK,
            keywords: publics.keywords,
            description: publics.description,
            host: `https://${req.headers.host}${req.url}`,
            csrfToken: JSON.stringify(req.session.cookie.token),
            baseUrl: process.env.BASE_URL,
            environment: process.env.NODE_ENV,
            jsPaths: process.env.NODE_ENV !== 'production' ? getFilePathNames(res, 'public').js : [],
            cssPaths: process.env.NODE_ENV !== 'production' ? getFilePathNames(res, 'public').css : [],
            fbAppId: JSON.stringify(process.env.FB_APP_ID),
            fbApiVersion: JSON.stringify(process.env.FB_API_VERSION),
            reactApp: ReactDOM.renderToStaticMarkup(component),
            redux: JSON.stringify(redux),
            google: process.env.GOOGLE_MAPS_API_KEY,
            token: JSON.stringify(token),
            ipLocation: JSON.stringify(req.connection.remoteAddress),
        });
    } else {
        next();
    }
});

// LEAVE HERE FOR CLI: APPLICATION ROUTER DECLARCATION

// API Pages
app.use(`/${process.env.BASE_API_URL}/`, (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') sourceMapSupport.install();

    req.session.user = req.session.user  === undefined ? {} : req.session.user;
    req.session.redux = req.session.redux  === undefined ? {} : req.session.redux;
    req.session.token = req.session.token  === undefined ? {} : req.session.token;

    let redux = !req.session.user[req.session.id] || !req.session.redux[req.session.user[req.session.id]] ? store.getState() : req.session.redux[req.session.user[req.session.id]];
    let token = !req.session.user[req.session.id] || !req.session.token[req.session.user[req.session.id]] ? null : req.session.token[req.session.user[req.session.id]];

    const routes = matchRoutes(declareApiRoutes(false), `/${process.env.BASE_API_URL}${req.url}`);

    const isAuth = routes[routes.length - 1].route.auth !== undefined;

    const userStore = createStore(redux);
    let context = {};
    const component = (
        <Provider store={userStore}>
            <StaticRouter location={`/${process.env.BASE_API_URL}${req.url}`} context={context}>
                {renderRoutes(declareApiRoutes(false))}
            </StaticRouter>
        </Provider>
    );

    let id = HashId;

    if (isAuth === true && !token) {
        res.redirect(`/${process.env.BASE_MAIN_URL}/login?next=/${process.env.BASE_MAIN_URL}${req.url}`);
    } else {
        res.status(200).render('api', {
            reactApp: ReactDOM.renderToStaticMarkup(component),
            redux: JSON.stringify(redux),
            hashId: id,
            partials: process.env.BACKEND_FRAMEWORK,
            token: JSON.stringify(token),
            environment: process.env.NODE_ENV,
            fbAppId: JSON.stringify(process.env.FB_APP_ID),
            fbApiVersion: JSON.stringify(process.env.FB_API_VERSION),
            jsPaths: process.env.NODE_ENV !== 'production' ? getFilePathNames(res, 'api').js : [],
            cssPaths: process.env.NODE_ENV !== 'production' ? getFilePathNames(res, 'api').css : [],
            keywords: apis.keywords,
            csrfToken: JSON.stringify(req.session.cookie.token),
            description: apis.description,
            host: `https://${req.headers.host}/${process.env.BASE_API_URL}${req.url}`,
            ipLocation: JSON.stringify(req.connection.remoteAddress),
        });
    }
});

// Main Pages
app.use(`/${process.env.BASE_MAIN_URL}/`, (req, res, next) => {

    if (process.env.NODE_ENV !== 'production') sourceMapSupport.install();

    req.session.user = req.session.user  === undefined ? {} : req.session.user;
    req.session.redux = req.session.redux  === undefined ? {} : req.session.redux;
    req.session.token = req.session.token  === undefined ? {} : req.session.token;

    let redux = !req.session.user[req.session.id] || !req.session.redux[req.session.user[req.session.id]] ? store.getState() : req.session.redux[req.session.user[req.session.id]];
    let token = !req.session.user[req.session.id] || !req.session.token[req.session.user[req.session.id]] ? null : req.session.token[req.session.user[req.session.id]];

    const routes = matchRoutes(declareMainRoutes(false), `/${process.env.BASE_URL}${req.url}`);

    const isAuth = routes[routes.length - 1].route.auth !== undefined;

    const userStore = createStore(redux);
    let context = {};
    const component = (
        <Provider store={userStore}>
            <StaticRouter location={`/${process.env.BASE_URL}${req.url}`} context={context}>
                {renderRoutes(declareMainRoutes(false))}
            </StaticRouter>
        </Provider>
    );

    let id = HashId;

    if (isAuth === true && !token) {
        res.redirect(`/${process.env.BASE_MAIN_URL}/login?next=/${process.env.BASE_MAIN_URL}${req.url}`);
    } else {
        res.status(200).render('main', {
            reactApp: ReactDOM.renderToStaticMarkup(component),
            redux: JSON.stringify(redux),
            hashId: id,
            partials: process.env.BACKEND_FRAMEWORK,
            token: JSON.stringify(token),
            environment: process.env.NODE_ENV,
            fbAppId: JSON.stringify(process.env.FB_APP_ID),
            fbApiVersion: JSON.stringify(process.env.FB_API_VERSION),
            jsPaths: process.env.NODE_ENV !== 'production' ? getFilePathNames(res, 'main').js : [],
            cssPaths: process.env.NODE_ENV !== 'production' ? getFilePathNames(res, 'main').css : [],
            keywords: mains.keywords,
            csrfToken: JSON.stringify(req.session.cookie.token),
            description: mains.description,
            host: `https://${req.headers.host}/${process.env.BASE_URL}${req.url}`,
            ipLocation: JSON.stringify(req.connection.remoteAddress),
        });
    }
});

app.use((error, req, res, next) => {
    if (error) {
        console.error('Error occured: ', error.stack);
        res.status(500).send({"Error" : error.stack});
    }
    next();
});

listenServer(app, openssl);

