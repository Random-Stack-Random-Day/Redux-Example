import firebase from 'firebase';


export class CharacterService {
    // GET ALL Characters
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
    // // GET A Character
    // static async getCharacterById(id) {
    //     const characterRef = firebase.database().ref('campaigns/Player1/characters')
    // }
    // POST A Character
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

    // PATCH A Character
    static async logACharacterPlaySession(character) {
        var charData ={
            name: character.name,
            charClass: character.charClass,
            experience: character.experience,
            level: character.level,
            gold: character.gold,
            perks: character.perks,
            checkmarks: character.checkmarks,
            characterId: character.characterId
        }

        var updates = {};

        updates['campaigns/Player1/characters/'+ character.characterId] = charData
        console.log(updates)
        return firebase.database().ref().update(updates);

    }
    // DELETE A Characer
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


