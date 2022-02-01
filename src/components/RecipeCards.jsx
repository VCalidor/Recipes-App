import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RecipeCards({ index, source, title, idMeal, idDrink }) {
  const history = useHistory();

  const toDetailsPage = () => {
    if (window.location.href === 'http://localhost:3000/foods') {
      history.push(`/foods/${idMeal}`);
    } else {
      history.push(`/drinks/${idDrink}`);
    }
  };
  return (
    <button
      onClick={ toDetailsPage }
      type="button"
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ source } alt={ title } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
    </button>
  );
}

RecipeCards.propTypes = {
  index: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  idMeal: PropTypes.string.isRequired,
  idDrink: PropTypes.string.isRequired,
};
