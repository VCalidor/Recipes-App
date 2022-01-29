import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCards({ index, source, title }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ source } alt="" data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
    </div>
  );
}

RecipeCards.propTypes = {
  index: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
