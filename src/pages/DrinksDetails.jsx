import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { drinksIdFetch } from '../services/index';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const [drinksData, setDrinksData] = useState({});

  useEffect(() => {
    async function fetchData() {
      setDrinksData(await drinksIdFetch(id));
    }
    fetchData();
  }, []);

  console.log(drinksData);

  return (
    <div>
      <p>Estamos na details</p>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
