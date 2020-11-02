import { combineReducers } from "redux";
import { localizeReducer } from "react-localize-redux";

// Reducers
import pokemonReducer from "./pokemonReducer";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  localize: localizeReducer,
});

export default rootReducer;
