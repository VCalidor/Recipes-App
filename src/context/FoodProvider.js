import React from "react";
import PropTypes from 'prop-types';
import FoodContext from "./foodContext";

function FoodProvider({ children }) {
  

  return (
    <FoodContext.Provider>
      { children }
    </FoodContext.Provider>
  )
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FoodProvider;