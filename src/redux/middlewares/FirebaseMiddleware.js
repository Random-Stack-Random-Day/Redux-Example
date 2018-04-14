import { signIn, signOut } from '../actions';

export const createFirebaseMiddleware = firebase => store => {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            store.dispatch(signIn(user));
        }
        else {
            store.dispatch(signOut());
        }
    });

    return next => action => {
        next(action);
    }
}