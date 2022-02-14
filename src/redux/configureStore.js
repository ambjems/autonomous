import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import infoReducer from "./reducers/infoReducer";
import { watcherSaga, watcherSaga2,watcherSaga3,watcherSaga4, watcherSaga5  } from "./sagas/rootSaga.js";

const reducer = combineReducers({
  info: infoReducer
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);
sagaMiddleware.run(watcherSaga2);
sagaMiddleware.run(watcherSaga3);
sagaMiddleware.run(watcherSaga4);
sagaMiddleware.run(watcherSaga5);



export default store;
