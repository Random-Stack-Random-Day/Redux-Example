export default class CharacterBuilder {

    static fillInProfile = (charClass) => {
        switch (charClass) {
            case("Mindthief"):
                return {image: "Some kewl image", description: "Some Kewl MND deets"};
            case("Tinkerer"):
                return {image: "Some kewl TNKR image", description: "Some Kewl TNKR deets"};
            default:
                break;
        }
    }

    static getLevelFromExp = (charExperience) => {
        let exp = charExperience;
        switch (true) {
            case(exp < 45):
                return 0
            case(exp < 90):
                return 1
            default:
                return 0
        }
    }
}