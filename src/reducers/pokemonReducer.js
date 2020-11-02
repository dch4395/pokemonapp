import * as actionTypes from "../actions/actionTypes";

const initialState = {
    totalSize: 0,
    limit: 10,
    offset: 1,
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
    isLoading: "",

    pokemonList: [],
    pokemon: null,
    myPokemon: []
};

const pokemonReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    
    switch (action.type) {
        case actionTypes.GET_POKEMON_START:
            newState.isLoading = true;
            newState.pokemonList = [];
            break;

        case actionTypes.GET_POKEMON_COMPLETE:
            newState.isLoading = false;
            newState.limit = parseInt(action.limit);
            newState.offset = parseInt(action.offset);
            newState.totalSize = action.payload.count;
            newState.pokemonList = action.payload.results;
            break;

        case actionTypes.GET_POKEMON_ERROR:
            newState.showAlert = true;
            newState.alertTitle = "Error";
            newState.alertMessage = "Get Pokemon Error";
            newState.alertType = "error";
            newState.isLoading = false;
            break;
        
        case actionTypes.GET_POKEMON_DETAIL_START:
            newState.isLoading = true;
            newState.pokemon = null;
            break;

        case actionTypes.GET_POKEMON_DETAIL_COMPLETE:
            newState.pokemon = action.payload;
            // newState.isLoading = false;
            break;

        case actionTypes.GET_POKEMON_DETAIL_ERROR:
            newState.showAlert = true;
            newState.alertTitle = "Error";
            newState.alertMessage = "Get Pokemon Error";
            newState.alertType = "error";
            newState.isLoading = false;
            break;

        case actionTypes.GET_POKEMON_SPECIES_COMPLETE:
            let pokemon = JSON.parse(JSON.stringify(newState.pokemon));
            pokemon.color = action.payload.color;

            newState.pokemon = pokemon;
            newState.isLoading = false;
            break;
        
        case actionTypes.GET_POKEMON_SPECIES_ERROR:
            newState.showAlert = true;
            newState.alertTitle = "Error";
            newState.alertMessage = "Get Pokemon Error";
            newState.alertType = "error";
            newState.isLoading = false;
            break;

        case actionTypes.ADD_MY_POKEMON:
            let arrayPokemon = JSON.parse(JSON.stringify(newState.myPokemon));
            let actionPayload = JSON.parse(JSON.stringify(action.payload));
            actionPayload.name = action.name;
            arrayPokemon.push(actionPayload);
            newState.myPokemon = arrayPokemon;
            break;

        case actionTypes.RELEASE_ALL_POKEMON:
            newState.myPokemon = [];
            break;

        case actionTypes.RELEASE_POKEMON:
            let mypokemon = JSON.parse(JSON.stringify(newState.myPokemon));
            mypokemon.map((item,index) => {
                if(item.id === action.payload){
                    mypokemon.splice(index,1);
                }
            })
            newState.myPokemon = mypokemon;
            break;
    }
    return newState;
}
export default pokemonReducer;