import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { drinksDetailsFetch, mealsNameFetch } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function DrinkDetails(props) {
  const [recipe, setRecipe] = useState([]);
  const [reco, setReco] = useState([]);
  const history = useHistory();

  const getRecipe = async () => {
    const maxCards = 6;
    const { match } = props;
    const { id } = match.params;
    const result = await drinksDetailsFetch(id);
    const recomendation = await mealsNameFetch('');
    setRecipe(result[0]);
    setReco(recomendation.slice(0, maxCards));
  };

  useEffect(() => {
    getRecipe();
  }, []);

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

  const newObj = prepareRecipe(recipe);
  const ingArr = Object.keys(newObj)
    .filter((key) => key.includes('strIngredient'));
  const measureArr = Object.keys(newObj)
    .filter((key) => key.includes('strMeasure'));

  const { strDrink, strDrinkThumb,
    strInstructions, strCategory, strAlcoholic, idDrink } = recipe;

  const startRecipe = () => {
    history.push(`/drinks/${idDrink}/in-progress`);
  };

  console.log(reco);

  return (
    <div>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="food" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <section data-testid="recipe-category">
        <h4>{strAlcoholic}</h4>
        <h4>{strCategory}</h4>
      </section>

      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeart } alt="favorite" />
      </button>
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
      <p data-testid="instructions">{strInstructions}</p>
      <section>
        <h1>recomendation</h1>
        {
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
        }
      </section>
      <h1 data-testid="video">Colocar video</h1>
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

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
