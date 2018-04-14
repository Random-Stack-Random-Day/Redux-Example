import { createStore, applyMiddleware } from 'redux';
import { createFirebaseMiddleware } from '../middlewares/FirebaseMiddleware';
import reducers from '../reducers';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import { firebaseConfig } from '../../config';
import { composeWithDevTools } from 'redux-devtools-extension';

firebase.initializeApp(firebaseConfig);

const firebaseMiddleware = createFirebaseMiddleware(firebase);
const INITIAL_STATE = {};

const store = createStore(
    reducers,
    INITIAL_STATE,
    composeWithDevTools(
        applyMiddleware(firebaseMiddleware, thunk)
    )
);

export default store;