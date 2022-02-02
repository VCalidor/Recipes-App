import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../css/RecipeCards.css';
import {
  cocktailsCategoriesRecipesFetch,
  mealsCategoriesRecipesFetch,
} from '../services';
import MyContext from '../context/MyContext';

function CategoriesButtons({ category, index }) {
  const { setResultsAPI } = useContext(MyContext);

  const getCategoriesRecipes = async () => {
    if (window.location.href === 'http://localhost:3000/foods') {
      const meals = await mealsCategoriesRecipesFetch(category);
      setResultsAPI(meals);
    } else {
      const drinks = await cocktailsCategoriesRecipesFetch(category);
      setResultsAPI(drinks);
    }
  };

  return (
    <button
      type="button"
      key={ index }
      data-testid={ `${category}-category-filter` }
      onClick={ getCategoriesRecipes }
      className="categories-buttons"
    >
      { category }
    </button>
  );
}

CategoriesButtons.propTypes = {
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CategoriesButtons;
