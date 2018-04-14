import { ActionTypes } from './ActionTypes';

export const signIn = user => {
    return {
        type: ActionTypes.SIGN_IN,
        details: user
    };
}

export const signOut = () => {
    return {
        type: ActionTypes.SIGN_OUT
    };
}