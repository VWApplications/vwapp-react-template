import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { Home } from "screens/Home";
import { SCREENS } from "shared/screens";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={SCREENS.HOME} component={Home} />
        <Route exact path='*' component={Home} />
      </Switch>
    );
  }
}

export default App;
