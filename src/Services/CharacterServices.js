import firebase from 'firebase';

export class CharacterService {

    static async getCharacters() {
         return await firebase.database().ref('campaigns/Player1/characters').once('value')
                .then((snapshot) => {
                   return snapshot.val();
                   
                })
                .catch((err) => {
                     console.log(err);
                })
                 
    }

    static async addCharacter(character) {
        return await firebase.database().ref('campaigns/Player1/characters/' + character.name).set({
            name: character.name,
            class: character.charClass,
            experience: character.experience,
            level: character.level,
            gold: character.gold,
            perks: character.perks,
            checkmarks: character.checkmarks
        })
    }
}