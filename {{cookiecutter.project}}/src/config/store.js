import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import reducers, { history } from "../reducers";
import sagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(sagas);

export default store;
