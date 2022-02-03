import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../css/RecipeCards.css';
import MyContext from '../context/MyContext';
import mealsAPI from '../services/mealsAPI';
import { drinksCategRecipe, drinksRender, mealsCategRecipe, mealsRender } from '../data';
import cocktailsAPI from '../services/cocktailsAPI';

function CategoriesButtons({ category, index }) {
  const { setGlobalFoods, setGlobalDrinks,
    filtersCategory, setFiltersCategory } = useContext(MyContext);

  const foodValidate = async () => {
    if (filtersCategory === category) {
      const meals = await mealsAPI(mealsRender);
      setGlobalFoods(meals);
      setFiltersCategory('');
    } else if (filtersCategory !== category) {
      setFiltersCategory(category);
      if (category !== 'All') {
        const meals = await mealsAPI(mealsCategRecipe, category);
        setGlobalFoods(meals);
      } else {
        const meals = await mealsAPI(mealsRender);
        setGlobalFoods(meals);
      }
    }
  };

  const drinksValidate = async () => {
    if (filtersCategory === category || filtersCategory === 'All') {
      const drinks = await cocktailsAPI(drinksRender);
      setGlobalDrinks(drinks);
      setFiltersCategory('');
    } if (filtersCategory !== category) {
      setFiltersCategory(category);
      if (category !== 'All') {
        const drinks = await cocktailsAPI(drinksCategRecipe, category);
        setGlobalDrinks(drinks);
      } else {
        const drinks = await cocktailsAPI(drinksRender);
        setGlobalDrinks(drinks);
      }
    }
  };

  const getCategoriesRecipes = () => {
    if (window.location.href === 'http://localhost:3000/foods') {
      foodValidate();
    } if (window.location.href === 'http://localhost:3000/drinks') {
      drinksValidate();
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
