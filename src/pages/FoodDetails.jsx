import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodDetailsFetch } from '../services';

function FoodDetails(props) {
  const [recipe, setRecipe] = useState('');

  const getRecipe = async () => {
    const { match } = props;
    const { id } = match.params;
    const result = await foodDetailsFetch(id);
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

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default FoodDetails;
