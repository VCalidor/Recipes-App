import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import foodIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const push = (path) => {
    history.push(path);
  };

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button
        type="button"
        onClick={ () => push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="imagem genérica de bebida"
        />
      </button>
      <button
        type="button"
        onClick={ () => push('/explore') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="imagem genérica de exploração"
        />
      </button>
      <button
        type="button"
        onClick={ () => push('/foods') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ foodIcon }
          alt="imagem genérica de bebida"
        />
      </button>
    </footer>
  );
}

export default Footer;
