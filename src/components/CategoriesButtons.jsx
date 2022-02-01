import PropTypes from 'prop-types';
import React from 'react';

function CategoriesButtons({ category, index }) {
  return (
    <button
      type="button"
      key={ index }
      data-testid={ `${category}-category-filter` }
    >
      { category }
    </button>
  );
}

CategoriesButtons.propTypes = {
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CategoriesButtons;
