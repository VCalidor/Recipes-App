import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mealsAPI from '../services/mealsAPI';
import { drinksName, mealsId } from '../data';
import cocktailsAPI from '../services/cocktailsAPI';
import MyContext from '../context/MyContext';
import FoodProgressCard from '../components/FoodProgressCard';

export default function FoodInProgress({ match: { params: { id } } }) {
  const { globalFoods } = useContext(MyContext);
  const [recipe, setRecipe] = useState(() => (
    globalFoods.filter((food) => food.idMeal === id)
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
    setRecipe(await mealsAPI(mealsId, id));
  };

  const getReco = async () => {
    const maxCards = 6;
    const recomendation = await cocktailsAPI(drinksName, '');
    setReco(recomendation.slice(0, maxCards));
  };

  const setDetailsProps = () => {
    const { strMeal, strMealThumb, strYoutube, strTags,
      strCategory, strInstructions, idMeal, strArea } = recipe[0];
    return {
      image: strMealThumb,
      title: strMeal,
      newObj: prepareRecipe(recipe),
      category: strCategory,
      instructions: strInstructions,
      video: strYoutube,
      identi: idMeal,
      reco,
      type: 'food',
      nationality: strArea,
      alcoholic: '',
      tags: strTags.split(',') || [],
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
          cocktails: {},
          meals: { [recipe[0].idMeal]: [] },
        }));
      JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
  }, [recipe]);

  return (
    <div>
      {
        (recipe.length > 0 && reco.length > 0) && (
          <FoodProgressCard
            details={ setDetailsProps() }
          />
        )
      }
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
