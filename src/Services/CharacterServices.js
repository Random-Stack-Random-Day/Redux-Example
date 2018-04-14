import firebase from 'firebase';


export class CharacterService {

    static async getCharacters() {
        const characterRef = firebase.database().ref('campaigns/Player1/characters');
         return await characterRef.once('value')
                .then((snapshot) => {
                   return snapshot.val();
                   
                })
                .catch((err) => {
                     console.log(err);
                })
                 
    }

    static async addCharacter(character) {
        return await firebase.database().ref('campaigns/Player1/characters/').push({
            name: character.name,
            class: character.charClass,
            experience: character.experience,
            level: character.level,
            gold: character.gold,
            perks: character.perks,
            checkmarks: character.checkmarks
        })
    }

    static async deleteCharacter(character) {
        const characterRef = firebase.database().ref('campaigns/Player1/characters');
        return await characterRef.on("child_removed", function(snapshot) {
            let deletedCharacter = snapshot.val();
            console.log("The character titles "+ deletedCharacter.name + " has been deleted");
        })
    }
}


