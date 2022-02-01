import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodIdFetch } from '../services/index';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const [foodData, setFoodData] = useState({ id });

  useEffect(() => {
    async function fetchData() {
      setFoodData(await foodIdFetch(id));
    }
    fetchData();
  }, []);

  console.log(foodData);

  return (
    <div>
      <p>Estamos na details</p>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodDetails;
