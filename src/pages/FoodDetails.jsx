import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mealsAPI from '../services/mealsAPI';
import { drinksName, mealsId } from '../data';
import cocktailsAPI from '../services/cocktailsAPI';
import MyContext from '../context/MyContext';
import DetailsCard from '../components/DetailsCard';

function FoodDetails({ match: { params: { id } } }) {
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
    const { strMeal, strMealThumb, strYoutube,
      strCategory, strInstructions, idMeal } = recipe[0];
    return {
      image: strMealThumb,
      title: strMeal,
      newObj: prepareRecipe(recipe),
      category: strCategory,
      instructions: strInstructions,
      video: strYoutube,
      identi: idMeal,
      reco,
    };
  };

  useEffect(() => {
    if (recipe.length === 0) {
      getRecipe();
    }
    getReco();
  }, []);

  return (
    <div>
      {
        (recipe.length > 0 && reco.length > 0) && (

          <DetailsCard
            details={ setDetailsProps() }
          />
        )

      }
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default FoodDetails;
