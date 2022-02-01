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
import ExploreFoods from './pages/ExploreFoods';
import NationalitiesFoods from './pages/NationalitiesFoods';
import SearchFoodByIngredients from './pages/SearchFoodByIngredients';
import SearchDrinkByIngredients from './pages/SearchDrinkByIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import MyProvider from './context/MyProvider';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/foods" exact component={ Foods } />
          <Route path="/foods/:id" component={ FoodDetails } />
          <Route path="/drinks/:id" component={ DrinkDetails } />
          <Route path="/drinks" exact component={ Drinks } />
          <Route path="/explore" exact component={ Explore } />
          <Route path="/done-recipes" exact component={ DoneRecipes } />
          <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
          <Route path="/explore/foods" exact component={ ExploreFoods } />
          <Route path="/explore/drinks" exact component={ ExploreDrinks } />
          <Route path="/profile" exact component={ Profile } />
          <Route
            path="/explore/foods/ingredients"
            exact
            component={ SearchFoodByIngredients }
          />
          <Route
            path="/explore/drinks/ingredients"
            exact
            component={ SearchDrinkByIngredients }
          />
          <Route
            path="/explore/foods/nationalities"
            exact
            component={ NationalitiesFoods }
          />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
