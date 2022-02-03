import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function DetailsCard({ details }) {
  const {
    image, title, newObj,
    category, instructions,
    video, reco, identi, alcoholic,
  } = details;
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const shareAlert = () => {
    copy(window.location.href);
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const startRecipe = () => {
    if (window.location.href === `http://localhost:3000/foods/${identi}`) {
      history.push(`/foods/${identi}/in-progress`);
    } else {
      history.push(`/drinks/${identi}/in-progress`);
    }
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ image } alt="food" />
      <h2 data-testid="recipe-title">{title}</h2>
      <button
        onClick={ shareAlert }
        data-testid="share-btn"
        type="button"
      >
        <img src={ shareIcon } alt="share" />
      </button>
      { visible === true && (
        <p>Link copied!</p>
      ) }
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeart } alt="favorite" />
      </button>
      <section>
        <ul>
          { newObj.ing.length > 0 && (
            newObj.ing.map((ingr, index) => (
              <li
                key={ ingr }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <span>{ newObj.rec[ingr] }</span>
                <span>{ newObj.rec[newObj.measure[index]] }</span>
              </li>
            ))
          )}
        </ul>
      </section>
      <section data-testid="recipe-category">
        { alcoholic && <h4>{ alcoholic }</h4>}
        <h4>{ category }</h4>
      </section>
      <p data-testid="instructions">{ instructions }</p>
      { video && (
        <iframe
          src={ video.replace('watch?v=', 'embed/') }
          allowFullScreen
          title="video"
          data-testid="video"
        />
      )}
      <section>
        <h1>
          Recomendation
        </h1>
        {
          reco[0].strDrink && (
            reco.map((rec, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ rec.strDrinkThumb } alt="recomendation" />
                <h3>{rec.strAlcoholic}</h3>
                <h3>{rec.strDrink}</h3>
              </div>
            ))
          )
        }
        {
          reco[0].strMeal && (
            reco.map((rec, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ rec.strMealThumb } alt="recomendation" />
                <h3>{rec.strCategory}</h3>
                <h3>{rec.strMeal}</h3>
              </div>
            ))
          )
        }
      </section>
      <button
        className="start-recipe"
        onClick={ startRecipe }
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

DetailsCard.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    newObj: PropTypes.shape({
      ing: PropTypes.arrayOf(PropTypes.string),
      measure: PropTypes.arrayOf(PropTypes.string),
      rec: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    category: PropTypes.string,
    instructions: PropTypes.string.isRequired,
    video: PropTypes.string,
    reco: PropTypes.arrayOf(PropTypes.object).isRequired,
    identi: PropTypes.string.isRequired,
    alcoholic: PropTypes.string,
  }),
};

DetailsCard.defaultProps = {
  details: PropTypes.shape({
    category: null,
    video: null,
    alcoholic: null,
  }),
};