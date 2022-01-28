import React, { useEffect, useState } from 'react';
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

  const searchButton = () => {
    switch (radioFilter) {
    case 'mealsFirstLetterR':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      } return mealsFirstLetterFetch(searchInput);
    case 'mealsIngredientR':
      return mealsIngredientFetch(searchInput);
    case 'mealsNameR':
      return mealsNameFetch(searchInput);
    case 'cocktailsNameR':
      return cocktailsNameFetch(searchInput);
    case 'cocktailsIngredientR':
      return cocktailsIngredientFetch(searchInput);
    case 'cocktailsFirstLetterR':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      } return cocktailsFirstLetterFetch(searchInput);
    default:
      break;
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
