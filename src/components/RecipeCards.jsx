import React from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeCards.css';
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
      <img
        src={ source }
        alt={ title }
        data-testid={ `${index}-card-img` }
        className="recipe-cards"
      />
      <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
    </button>
  );
}

RecipeCards.propTypes = {
  index: PropTypes.number,
  source: PropTypes.string,
  title: PropTypes.string,
  idMeal: PropTypes.string,
  idDrink: PropTypes.string,
};

RecipeCards.defaultProps = {
  index: 0,
  source: '',
  title: '',
  idMeal: '',
  idDrink: '',
};
