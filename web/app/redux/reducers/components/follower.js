import { setupInitialState, setupReducerBlock } from '../../utils';
import { actionTypes, follower } from '../../store/actionTypes';

const INITIAL_STATE = setupInitialState();

export default function (state = INITIAL_STATE, action) {
    return follower.reduce((acc, item) => {
        let reducer = setupReducerBlock(action, state, item.actionName, item.stateKeys, item.propKey);
        if (reducer) acc = reducer;
        return acc;
    }, state);
}
