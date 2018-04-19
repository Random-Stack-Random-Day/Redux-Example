import { CharacterService } from '../../Services/CharacterServices';


export const addCharacter = character => async dispatch => {
    await CharacterService.addCharacter(character)
    .then((snapshot) => {
        var charKey = snapshot.key;
        dispatch({ type: "ADD_CHARACTER", character: {[charKey] : character} })
    })
    .catch((err) => {
            console.log(err)
    });  
}
export const getCharacters = () => dispatch => {
    const characters = CharacterService.getCharacters();
    characters.then((res) => {
        console.log(res)
        dispatch({ type: "FETCH_CHARACTERS", characters: res})
    })
    .catch((err) => {
        console.log(err);
    })
}

export const deleteCharacter = character => async dispatch => {
    await CharacterService.deleteCharacter(character);
    dispatch({ type: "DELETE_CHARACTER", character: character})
}

export const logACharacterPlaySession = character => async dispatch => {
    await CharacterService.logACharacterPlaySession(character);
    dispatch({ type: "LOG_A_SESSION", character: character})
}

