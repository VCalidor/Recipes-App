import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinksDetailsFetch } from '../services';

function DrinkDetails(props) {
  const [recipe, setRecipe] = useState('');

  const getRecipe = async () => {
    const { match } = props;
    const { id } = match.params;
    const result = await drinksDetailsFetch(id);
    setRecipe(result);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  console.log(recipe);
  return (
    <div>
      oi
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
