import { CharacterService } from '../../Services/CharacterServices';


export const addCharacter = character => async dispatch => {
    await CharacterService.addCharacter(character);
    dispatch({ type: "ADD_CHARACTER", character: character })
}
export const getCharacters = () => async dispatch => {
    const characters = await CharacterService.getCharacters();
    console.log(characters);
        Object.keys(characters).map((k, v) => {
            dispatch({ type: "FETCH_CHARACTERS", characters: characters[k] })
        }
    )
}

export const deleteCharacters = character => async dispatch => {
    const character = await CharacterService
}
