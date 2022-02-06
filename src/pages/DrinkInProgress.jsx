import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinksName, drinksId } from '../data';
import cocktailsAPI from '../services/cocktailsAPI';
import MyContext from '../context/MyContext';
import DrinkProgressCard from '../components/DrinkProgressCard';

export default function DrinkInProgress({ match: { params: { id } } }) {
  const { globalDrinks } = useContext(MyContext);
  const [recipe, setRecipe] = useState(() => (
    globalDrinks.filter((food) => food.idDrink === id)
  ));
  const [reco, setReco] = useState([]);

  const prepareRecipe = (arr) => {
    const keys = Object.keys(arr[0]);
    keys.forEach((key) => {
      if (arr[0][key] === '' || !(arr[0][key]) || arr[0][key] === ' ') {
        return delete arr[0][key];
      }
    });
    const ingArr = Object.keys(arr[0])
      .filter((key) => key.includes('strIngredient'));
    const measureArr = Object.keys(arr[0])
      .filter((key) => key.includes('strMeasure'));
    const newObj = {
      ing: ingArr,
      measure: measureArr,
      rec: arr[0],
    };
    return newObj;
  };

  const getRecipe = async () => {
    setRecipe(await cocktailsAPI(drinksId, id));
  };

  const getReco = async () => {
    const maxCards = 6;
    const recomendation = await cocktailsAPI(drinksName, '');
    setReco(recomendation.slice(0, maxCards));
  };

  const setDetailsProps = () => {
    const { strDrink, strDrinkThumb, strYoutube,
      strCategory, strInstructions, idDrink } = recipe[0];
    return {
      image: strDrinkThumb,
      title: strDrink,
      newObj: prepareRecipe(recipe),
      category: strCategory,
      instructions: strInstructions,
      video: strYoutube,
      identi: idDrink,
      reco,
    };
  };

  useEffect(() => {
    if (recipe.length === 0) {
      getRecipe();
    }
    getReco();

    const locStore = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!locStore && recipe.length > 0) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          cocktails: { [recipe[0].idDrink]: [] },
          Drinks: {},
        }));
      JSON.parse(localStorage.getItem('inProgressRecipes'));
    } else if (recipe.length > 0) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(locStore));
    }
  }, [recipe]);

  return (
    <div>
      {
        (recipe.length > 0 && reco.length > 0) && (
          <DrinkProgressCard
            details={ setDetailsProps() }
          />
        )
      }
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
