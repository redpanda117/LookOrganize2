import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import MySchedule from "./pages/Calendar";
import Register from "./pages/Register";
import Finance from "./pages/Finance";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Login} />
        <Route exact path= "/schedule/" component={MySchedule}/>
        <Route exact path="/notes/" component={Notes} />
        <Route exact path="/finance/" component={Finance} />
        <Route exact path="/notes/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
