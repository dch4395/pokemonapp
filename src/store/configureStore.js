import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "../reducers/rootReducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const logger = store => next => action => {
  console.log("[Middleware] Dispatching", action);
  const result = next(action);
  console.log("[Middleware] next state", store.getState());
  return result;
};

let middleware = [thunk];
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default();
  middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
  // production code
  middleware = [...middleware];
}

const enhancher = composeEnhancers(
  applyMiddleware(
    logger,
    thunk,
    reduxImmutableStateInvariant({
      ignore: [
          
      ]
    })
  )
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancher);
}
