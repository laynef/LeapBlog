import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { __CLIENT__, __DEVELOPMENT__ } from '../../utils';


export default function createStore(data, history) {
	// Sync dispatched route actions to the history
	const middleware = [thunk, ReduxPromise];

	let finalCreateStore;
	if (__CLIENT__ && __DEVELOPMENT__) {
		let logger = createLogger();
		finalCreateStore = compose(
			applyMiddleware(...middleware, logger),
		)(_createStore);
	} else {
		finalCreateStore = applyMiddleware(...middleware)(_createStore);
	}

	const reducer = require('../reducers');
	const store = finalCreateStore(reducer, data);

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('../reducers', () => {
			const newReducers = require('../reducers');
			store.replaceReducer(newReducers);
		});
	}

	return store;
}
