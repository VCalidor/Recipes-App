import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/foods" exact component={ Foods } />
        <Route path="/drinks" exact component={ Drinks } />
        <Route path="/explore" exact component={ Explore } />
        <Route path="/donerecipes" exact component={ DoneRecipes } />
        <Route path="/favoriterecipes" exact component={ FavoriteRecipes } />
        <Route path="/profile" exact component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
