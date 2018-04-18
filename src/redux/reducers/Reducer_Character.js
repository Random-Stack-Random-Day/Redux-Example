import { ActionTypes } from '../actions/ActionTypes';
import { omit } from 'ramda';

const INITIAL_STATE = {
}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case ActionTypes.ADD_CHARACTER:
            console.log("ADDED: ", action)
            console.log("Char?", action.character)
            return { ...state, ...action.character };
        case ActionTypes.FETCH_CHARACTERS:
            console.log("RETRIEVED CHARACTERS")
            console.log(action)
            return { ...state, ...action.characters };
        case ActionTypes.DELETE_CHARACTER:
            console.log("DELETED CHARACTER");
            return omit([action.character], state)
        case ActionTypes.LOG_A_SESSION:
            console.log("SESSION LOGGED");
            console.log(action.character, "Character")
            return { ...state, [action.character.characterId]: action.character}
        default:
            return state;
    }

}