import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [resultsAPI, setResultsAPI] = useState([{
    idMeal: undefined,
    idDrink: undefined,
  }]);
  const store = {
    resultsAPI,
    setResultsAPI,
  };

  return (
    <MyContext.Provider value={ store }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
