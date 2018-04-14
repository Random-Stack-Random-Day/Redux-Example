import { CharacterService } from '../../Services/CharacterServices';


export const addCharacter = character => async dispatch => {
    const characterCall = await CharacterService.addCharacter(character);
    console.log(characterCall);
    // dispatch({ type: "ADD_CHARACTER", character: character })
}

export const getCharacters = () => async dispatch => {
    const characters = await CharacterService.getCharacters();
    console.log(characters);
        Object.keys(characters).map((k, v) => {
            dispatch({ type: "FETCH_CHARACTERS", characters: characters[k] })
        }
    )
}
