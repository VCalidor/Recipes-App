import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { drinksIdFetch } from '../services/index';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const [drinksData, setDrinksData] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      return setDrinksData(await drinksIdFetch(id));
    }
    fetchData();
  }, [id]);

  const prepareRecipe = (obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (obj[key] === '' || !(obj[key])
      ) {
        return delete obj[key];
      }
    });
    return obj;
  };

  const newObj = prepareRecipe(drinksData[0]);
  const ingArr = Object.keys(newObj)
    .filter((key) => key.includes('strIngredient'));
  const measureArr = Object.keys(newObj)
    .filter((key) => key.includes('strMeasure'));

  const {
    strDrink,
    strAlcoholic,
    strCategory,
    strDrinkThumb,
    strInstructions,
  } = drinksData[0];

  return (
    <>
      <section>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
        />
      </section>
      <section>
        <h2
          data-testid="recipe-title"
        >
          { strDrink }
        </h2>
        <div>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img
              src={ whiteHeart }
              alt="favorite"
            />
          </button>
        </div>
        <p
          data-testid="recipe-category"
        >
          { strCategory }
        </p>
        <p>{ strAlcoholic }</p>
      </section>
      <section>
        <ul>
          { ingArr.map((ing, index) => (
            <li
              key={ ing }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { newObj[ing] }
              { ' - ' }
              { newObj[measureArr[index]] }
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p
          data-testid="instructions"
        >
          { strInstructions }
        </p>
      </section>
      <section>
        <h1
          data-testid="0-recomendation-card"
        >
          map de cards de recomendação
        </h1>
      </section>
      <section>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </section>
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
