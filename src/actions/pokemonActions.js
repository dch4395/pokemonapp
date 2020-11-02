import Axios from "../axios";
import * as actionTypes from "./actionTypes";

export const getPokemon = (limit, offset, filter) => {
    return  (dispatch, getState) => {
        dispatch({
          type: actionTypes.GET_POKEMON_START
        });

        let totalOffset = 1;

        if(parseInt(offset) <= 0){
            offset = 1
        }else if(parseInt(offset) > 1){
            let limit = getState().pokemon.limit;
            totalOffset = (parseInt(offset) - 1) * parseInt(limit) + 1;
        }

        let url =
          "/pokemon?limit=" +
          limit +
          "&offset=" +
          totalOffset;

        Axios.get(url)
          .then(response => {
            dispatch({
              type: actionTypes.GET_POKEMON_COMPLETE,
              payload: response.data,
              limit,
              offset
            });
          })
          .catch(error => {
            dispatch({
              type: actionTypes.GET_POKEMON_ERROR,
              payload: error
            });
          });
      };
}

export const getPokemonDetail = name => {
    return  (dispatch, getState) => {
        dispatch({
          type: actionTypes.GET_POKEMON_DETAIL_START
        });

        let url =
          "/pokemon/" + name;

        Axios.get(url)
          .then(response => {
            dispatch({
              type: actionTypes.GET_POKEMON_DETAIL_COMPLETE,
              payload: response.data,
            });
            dispatch(getSpecies(response.data.species.url));
          })
          .catch(error => {
            dispatch({
              type: actionTypes.GET_POKEMON_DETAIL_ERROR,
              payload: error
            });
          });
      };
}

export const getSpecies = url => {
    return (dispatch, getState) => {
        Axios.get(url)
          .then(response => {
            dispatch({
              type: actionTypes.GET_POKEMON_SPECIES_COMPLETE,
              payload: response.data,
            });
          })
          .catch(error => {
            dispatch({
              type: actionTypes.GET_POKEMON_SPECIES_ERROR,
              payload: error
            });
          });
      };
}

export const addMyPokemon = (pokemon, name) => {
    return{
        type: actionTypes.ADD_MY_POKEMON,
        payload: pokemon,
        name: name
    }
}

export const releasePokemon = id => {
  return{
      type: actionTypes.RELEASE_POKEMON,
      payload: id
  }
}

export const releaseAllPokemon = () => {
  return{
      type: actionTypes.RELEASE_ALL_POKEMON,
  }
}

export const getPokemonDetailById = id => {
  return  (dispatch, getState) => {
      dispatch({
        type: actionTypes.GET_POKEMON_DETAIL_START
      });

      let url =
        "/pokemon/" + id;

      Axios.get(url)
        .then(response => {
          dispatch({
            type: actionTypes.GET_POKEMON_DETAIL_COMPLETE,
            payload: response.data,
          });
          dispatch(getSpecies(response.data.species.url));
        })
        .catch(error => {
          dispatch({
            type: actionTypes.GET_POKEMON_DETAIL_ERROR,
            payload: error
          });
        });
    };
}