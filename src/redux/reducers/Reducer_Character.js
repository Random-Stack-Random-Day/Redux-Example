import { ActionTypes } from '../actions/ActionTypes';

const INITIAL_STATE = {
}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case ActionTypes.ADD_CHARACTER:
            console.log("ADDED: ", action.character)
            return { ...state, [action.character.name]: action.character };
        case ActionTypes.FETCH_CHARACTERS:
            console.log("RETRIEVED CHARACTERS")
            return { ...state, [action.characters.name]: action.characters };
        default:
            return state;
    }

}