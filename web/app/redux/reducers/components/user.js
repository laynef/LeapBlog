import { setupInitialState, setupReducerBlock, oneReducerBlock } from '../../utils';
import { actionTypes, user } from '../../store/actionTypes';

const INITIAL_STATE = setupInitialState([
	'general',
	'login',
]);

export default function (state = INITIAL_STATE, action) {

	return user.reduce((acc, item) => {
        let reducer = null;

		if (item.stateKeys && item.stateKeys === 'login') reducer = oneReducerBlock(action, state, item.actionName, item.stateKeys, item.propKey);
        else reducer = setupReducerBlock(action, state, item.actionName, item.stateKeys, item.propKey);

		if (reducer) acc = reducer;
		return acc;
	}, state);

}
