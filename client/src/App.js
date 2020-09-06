import React,{ useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Register from './components/Register';
import Login from './components/Login';



function App(props) {

  const [user, setUser] = useState(null);

  function login(username) {
    setUser(username);
    console.log('logged in as ' + username);
    props.history.push("/");
  };

  function logout() {
    setUser(null);
    console.log('logged out');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <Switch>
          <Route path="/register">
            <Register login={login} />
          </Route>
          <Route path="/login">
            <Login login={login} />
          </Route>
          <Route path="/">
            <Map user={user}/>
          </Route>
        </Switch>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
