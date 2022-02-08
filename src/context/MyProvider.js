import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import mealsAPI from '../services/mealsAPI';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinksRender, mealsRender } from '../data';
import { getLocalIterable } from '../services/helpers';

export default function MyProvider({ children }) {
  const [resultsAPI, setResultsAPI] = useState([{
    idMeal: undefined,
    idDrink: undefined,
  }]);
  // jeito novo
  const [globalFoods, setGlobalFoods] = useState([]);
  const [globalDrinks, setGlobalDrinks] = useState([]);
  const [filtersCategory, setFiltersCategory] = useState('');
  const [sendFood, setSendFood] = useState('');
  const [sendDrink, setSendDrink] = useState('');

  const foodData = async () => setGlobalFoods(await mealsAPI(mealsRender));
  const drinksData = async () => setGlobalDrinks(await cocktailsAPI(drinksRender));

  const [inProgress, setInProgress] = useState(getLocalIterable('inProgressRecipes') || (
    { cocktails: {}, meals: {} }));
  const [favorites, setFavorites] = useState(getLocalIterable('favoriteRecipes') || []);
  const checkFavorites = (id) => favorites.some((favorite) => (
    Number(favorite.id) === Number(id)));

  useEffect(() => {
    foodData();
    drinksData();
  }, []);

  const store = {
    resultsAPI,
    setResultsAPI,
    globalFoods,
    globalDrinks,
    setGlobalFoods,
    setGlobalDrinks,
    filtersCategory,
    setFiltersCategory,
    inProgress,
    setInProgress,
    checkFavorites,
    setFavorites,
    favorites,
    sendDrink,
    setSendDrink,
    setSendFood,
    sendFood,
  };

  return (
    <MyContext.Provider value={ store }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
