import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <div>
        <label htmlFor="ingredient">
          <input name="ingredient" data-testid="ingredient-search-radio" type="radio" />
          ingredient
        </label>
        <label htmlFor="name-food">
          <input name="name-food" data-testid="name-search-radio" type="radio" />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            name="first-letter"
            data-testid="first-letter-search-radio"
            type="radio"
          />
          First Letter
        </label>
      </div>
      <input data-testid="search-input" type="text" />
      <button data-testid="exec-search-btn" type="button">
        Search
      </button>
    </div>);
}
