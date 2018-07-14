import { setupInitialState, setupReducerBlock } from '../../utils';
import { actionTypes, blog } from '../../store/actionTypes';

const INITIAL_STATE = setupInitialState();

export default function (state = INITIAL_STATE, action) {

    const states = { ...state };

	return blog.reduce((acc, item) => {
		let reducer = setupReducerBlock(action, state, item.actionName, item.stateKeys, item.propKey, item.lookUpKey);
		if (reducer) acc = reducer;
		return acc;
	}, state);

}
