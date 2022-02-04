import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import '../css/RecipeCards.css';

export default function RecipeCards({ index, source, title, identificador }) {
  const { pathname } = useLocation();

  const getLocal = () => {
    if (pathname.includes('nationalities')) {
      return `/foods/${identificador}`;
    } return `${pathname}/${identificador}`;
  };

  return (
    <Link className="RecipeCards" to={ getLocal() }>
      <section
        className="container"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ source }
          alt={ title }
          data-testid={ `${index}-card-img` }
          className="recipe-cards"
        />
        <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
      </section>
    </Link>
  );
}

RecipeCards.propTypes = {
  index: PropTypes.number,
  source: PropTypes.string,
  title: PropTypes.string,
  identificador: PropTypes.string,
};

RecipeCards.defaultProps = {
  index: 0,
  source: '',
  title: '',
  identificador: '',
};
