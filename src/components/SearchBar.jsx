import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { drinksFirstLetter,
  drinksIng,
  drinksName,
  mealsFirstLetter,
  mealsIng,
  mealsName } from '../data';
import cocktailsAPI from '../services/cocktailsAPI';
import mealsAPI from '../services/mealsAPI';
import '../css/SearchBar.css';

let ingredientR = '';
let nameR = '';
let firstLetterR = '';

export default function SearchBar() {
  const [radioFilter, setRadioFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { globalFoods, setGlobalFoods,
    globalDrinks, setGlobalDrinks } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    if (window.location.href === 'http://localhost:3000/foods') {
      ingredientR = 'mealsIngredientR';
      nameR = 'mealsNameR';
      firstLetterR = 'mealsFirstLetterR';
    } else {
      ingredientR = 'cocktailsIngredientR';
      nameR = 'cocktailsNameR';
      firstLetterR = 'cocktailsFirstLetterR';
    }
  }, []);

  useEffect(() => {
    console.log(globalFoods);
    if (window.location.href === 'http://localhost:3000/foods' && globalFoods.length === 1) {
      return history.push(`/foods/${globalFoods[0].idMeal}`);
    }
    if (globalDrinks.length === 1) {
      return history.push(`/drinks/${globalDrinks[0].idDrink}`);
    }
  }, [globalFoods, globalDrinks, history]);

  const searchButton = async () => {
    switch (radioFilter) {
    case 'mealsFirstLetterR':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      setGlobalFoods(await mealsAPI(mealsFirstLetter, searchInput));
      break;
    case 'mealsIngredientR':
      setGlobalFoods(await mealsAPI(mealsIng, searchInput));
      break;
    case 'mealsNameR':
      setGlobalFoods(await mealsAPI(mealsName, searchInput));
      break;
    case 'cocktailsNameR':
      setGlobalDrinks(await cocktailsAPI(drinksName, searchInput));
      break;
    case 'cocktailsIngredientR':
      setGlobalDrinks(await cocktailsAPI(drinksIng, searchInput));
      console.log(globalDrinks);
      break;
    case 'cocktailsFirstLetterR':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      setGlobalDrinks(await cocktailsAPI(drinksFirstLetter, searchInput));
      break;
    default:
      break;
    }
  };

  return (
    <div className="SearchBar">
      <div className="radio">
        <label htmlFor="radio-inputs" className="ml">
          <input
            name="radio-inputs"
            data-testid="ingredient-search-radio"
            type="radio"
            onClick={ () => setRadioFilter(ingredientR) }
          />
          ingredient
        </label>
        <label htmlFor="radio-inputs">
          <input
            name="radio-inputs"
            data-testid="name-search-radio"
            type="radio"
            onClick={ () => setRadioFilter(nameR) }
          />
          Name
        </label>
        <label htmlFor="radio-inputs" className="mr">
          <input
            name="radio-inputs"
            data-testid="first-letter-search-radio"
            type="radio"
            onClick={ () => setRadioFilter(firstLetterR) }
          />
          First Letter
        </label>
      </div>
      <div className="submit">
        <input
          className="ml"
          data-testid="search-input"
          type="text"
          value={ searchInput }
          onChange={ ({ target: { value } }) => setSearchInput(value) }
        />
        <button
          className="mr"
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchButton }
        >
          Search
        </button>
      </div>
    </div>
  );
}
