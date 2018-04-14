import { combineReducers } from 'redux';
import UserReducer from './Reducer_User';
import CharacterReducer from './Reducer_Character';

    export default combineReducers({
        user: UserReducer,
        characters: CharacterReducer
    });