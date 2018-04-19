import { ActionTypes } from '../actions/ActionTypes';

const INITIAL_STATE = {
    authenticated: false,
    details: {}
};

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { authenticated: true, details: action.details };
        case ActionTypes.SIGN_OUT:
            console.log("Reducer signout");
            return INITIAL_STATE
        default:
            return state;
    }
}