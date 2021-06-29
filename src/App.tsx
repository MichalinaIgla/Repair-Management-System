import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './componentes/login/Login';
import { PrivateRoute } from './componentes/login/PrivateRoute';
import { Overview } from './componentes/Overview';


const App = () => {
  return(
    <Router>
      <div  className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Overview}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}


export default App;


