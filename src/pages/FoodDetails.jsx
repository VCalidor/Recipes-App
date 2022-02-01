import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { cocktailsNameFetch, foodDetailsFetch } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FoodDetails(props) {
  const [recipe, setRecipe] = useState([]);
  const [reco, setReco] = useState([]);
  const history = useHistory();

  const getRecipe = async () => {
    const maxCards = 6;
    const { match } = props;
    const { id } = match.params;
    const result = await foodDetailsFetch(id);
    const recomendation = await cocktailsNameFetch('');
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

  const { strMeal, strMealThumb, strCategory, strInstructions, idMeal } = recipe;

  const startRecipe = () => {
    history.push(`/foods/${idMeal}/in-progress`);
  };

  console.log(reco);

  // data-testid="${index}-ingredient-name-and-measure";
  // data-testid="video";
  // d;

  return (
    <div>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="food" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
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
      <h4 data-testid="recipe-category">{strCategory}</h4>
      <p data-testid="instructions">{strInstructions}</p>
      <h1 data-testid="video">Colocar video</h1>
      <section>
        <h1>
          Recomendation
        </h1>
        {
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

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default FoodDetails;
