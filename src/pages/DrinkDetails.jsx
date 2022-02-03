import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinksId, mealsName } from '../data';
import mealsAPI from '../services/mealsAPI';
import MyContext from '../context/MyContext';
import DetailsCard from '../components/DetailsCard';

function DrinkDetails({ match: { params: { id } } }) {
  const { globalDrinks } = useContext(MyContext);
  const [recipe, setRecipe] = useState(() => (
    globalDrinks.filter((drink) => drink.idDrink === id)
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
    const recomendation = await mealsAPI(mealsName, '');
    setReco(recomendation.slice(0, maxCards));
  };

  const setDetailsProps = () => {
    const { strDrink, strDrinkThumb, strAlcoholic,
      strCategory, strInstructions, idDrink } = recipe[0];
    return {
      image: strDrinkThumb,
      title: strDrink,
      newObj: prepareRecipe(recipe),
      category: strCategory,
      alcoholic: strAlcoholic,
      instructions: strInstructions,
      identi: idDrink,
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
        (recipe.length > 0 && reco.length > 0) && <DetailsCard
          details={ setDetailsProps() }
        />
      }
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
