import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import {
  mealsFirstLetterFetch,
  mealsNameFetch,
  mealsIngredientFetch,
  cocktailsFirstLetterFetch,
  cocktailsNameFetch,
  cocktailsIngredientFetch,
} from '../services';

let ingredientR = '';
let nameR = '';
let firstLetterR = '';

export default function SearchBar() {
  const [radioFilter, setRadioFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { resultsAPI, setResultsAPI } = useContext(MyContext);

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
    if (resultsAPI.length === 1) {
      if (window.location.href === 'http://localhost:3000/foods') {
        return history.push(`/foods/${resultsAPI[0].idMeal}`);
      } return history.push(`/drinks/${resultsAPI[0].idDrink}`);
    }
  }, [resultsAPI, history]);

  const searchButton = async () => {
    switch (radioFilter) {
    case 'mealsFirstLetterR':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      } setResultsAPI(await mealsFirstLetterFetch(searchInput));
      break;
    case 'mealsIngredientR':
      setResultsAPI(await mealsIngredientFetch(searchInput));
      break;
    case 'mealsNameR':
      setResultsAPI(await mealsNameFetch(searchInput));
      break;
    case 'cocktailsNameR':
      setResultsAPI(await cocktailsNameFetch(searchInput));
      break;
    case 'cocktailsIngredientR':
      setResultsAPI(await cocktailsIngredientFetch(searchInput));
      break;
    case 'cocktailsFirstLetterR':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      } setResultsAPI(await cocktailsFirstLetterFetch(searchInput));
      break;
    default:
      break;
    }

    if (resultsAPI.length === 0) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="radio-inputs">
          <input
            name="radio-inputs"
            data-testid="ingredient-search-radio"
            type="radio"
            onClick={ () => setRadioFilter(ingredientR) }
          />
          ingredient
          <input
            name="radio-inputs"
            data-testid="name-search-radio"
            type="radio"
            onClick={ () => setRadioFilter(nameR) }
          />
          Name
          <input
            name="radio-inputs"
            data-testid="first-letter-search-radio"
            type="radio"
            onClick={ () => setRadioFilter(firstLetterR) }
          />
          First Letter
        </label>
      </div>
      <input
        data-testid="search-input"
        type="text"
        value={ searchInput }
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ searchButton }
      >
        Search
      </button>
    </div>
  );
}
