import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default combineReducers({
  router: connectRouter(history)
});
