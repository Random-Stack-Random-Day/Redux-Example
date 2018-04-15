import firebase from 'firebase';


export class CharacterService {

    static getCharacters() {
        const characterRef = firebase.database().ref('campaigns/Player1/characters');
         return characterRef.once('value')
                .then((snapshot) => {
                   return snapshot.val();
                   
                })
                .catch((err) => {
                     console.log(err);
                })
                 
    }

    static async addCharacter(character) {
        const charRef = firebase.database().ref('campaigns/Player1/characters/')
        return charRef.push({
            name: character.name,
            charClass: character.charClass,
            experience: character.experience,
            level: character.level,
            gold: character.gold,
            perks: character.perks,
            checkmarks: character.checkmarks,
            description: character.description
        })
    }

    static deleteCharacter(characterKey) {
        const characterRef = firebase.database().ref('campaigns/Player1/characters');
        return characterRef.child(characterKey).remove().then((res) =>
            console.log('Successfully deleted ' + res)
        )
        .catch((err) => {
            console.log(err)
        })
    }
}


