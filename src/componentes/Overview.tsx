import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Employees } from './employees/Employees';
import { Home } from './home/Home';
import { NavBar } from './nav/NavBar';
import { Orders } from './orders/Orders';
import { Profile } from './profile/Profile';

export const Overview:React.FC = () => {

    return(
        <div className="App">
            <Router>
                <NavBar />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/employees" component={Employees}/>
                    </Switch>
            </Router>
        </div>
      );
}
