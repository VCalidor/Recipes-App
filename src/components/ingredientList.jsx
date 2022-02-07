import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({ newObj }) {
  return (
    <section className="ingredient-list">
      <ul>
        { newObj.ing.length > 0 && (
          newObj.ing.map((ingr, index) => (
            <li
              key={ ingr }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <span>{ newObj.rec[ingr] }</span>
              <span>---</span>
              <span>{ newObj.rec[newObj.measure[index]] }</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

IngredientList.propTypes = {
  newObj: PropTypes.shape({
    ing: PropTypes.arrayOf(PropTypes.string),
    measure: PropTypes.arrayOf(PropTypes.string),
    rec: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default IngredientList;
