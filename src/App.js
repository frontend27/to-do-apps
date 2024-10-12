import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import User from './component/User';
import Navigtion from './component/Navigition';
import UserView from './component/UserView';
import Login from './component/Login';

function App() {
  return (
    <Router>
      <div>
      <Navigtion />
      <Switch>
        <Route exact path="/" component={ Home} />
        <Route exact path="/About" component={ About} />
        <Route exact path="/login" component={ Login} />
        <Route exact path="/user/add" component={ User} />
        <Route exact path="/user/view/:id" component={ UserView} />
        <Route exact path="/user/edit/:id" component={ User} />
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
