import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinksDetailsFetch, mealsNameFetch } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function DrinkDetails(props) {
  const [recipe, setRecipe] = useState('');
  const [reco, setReco] = useState('');

  const getRecipe = async () => {
    const magicNumber = 6;
    const { match } = props;
    const { id } = match.params;
    const result = await drinksDetailsFetch(id);
    const recomendation = await mealsNameFetch('');
    setRecipe(result[0]);
    setReco(recomendation.slice(0, magicNumber));
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const { strDrink, strDrinkThumb,
    strInstructions, strCategory, strAlcoholic } = recipe;
  console.log(reco);

  return (
    <div>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="food" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <h4>{strAlcoholic}</h4>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeart } alt="favorite" />
      </button>
      <h4 data-testid="recipe-category">{strCategory}</h4>
      <p data-testid="instructions">{strInstructions}</p>
      <section>
        <h1>recomendation</h1>
        {/* {
          reco.map((rec, index) => (
            <div key={ `data-testid="${index}-recomendation-card"` }>
              <img src={ rec.strMealThumb } alt="recomendation" />
              <h3>{rec.strCategory}</h3>
              <h3>{rec.strMeal}</h3>
            </div>
          ))
        } */}
      </section>
      <button data-testid="start-recipe-btn" type="button">
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
