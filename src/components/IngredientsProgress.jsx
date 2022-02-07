import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function IngredientsProgress(
  {
    index,
    ingr,
    newObj,
    inProgress,
    setInProgress,
  },
) {
  const [check, setCheck] = useState(false);

  const checkboxButton = () => {
    setCheck(!check);
    if (!check && !inProgress.includes(index)) {
      setInProgress([...inProgress, index]);
    } else if (check) {
      setInProgress(inProgress.filter((ingredient) => ingredient !== index));
    }
  };

  return (
    <>
      <input
        type="checkbox"
        defaultChecked={ inProgress.includes(index) }
        onChange={ checkboxButton }
      />
      <span style={ { textDecoration: check ? 'line-through' : 'none' } }>
        { `${newObj.rec[newObj.measure[index]]} of ${newObj.rec[ingr]}` }
      </span>
    </>
  );
}

IngredientsProgress.propTypes = {
  index: PropTypes.number.isRequired,
  inProgress: PropTypes.arrayOf(PropTypes.number).isRequired,
  setInProgress: PropTypes.func.isRequired,
  ingr: PropTypes.string.isRequired,
  newObj: PropTypes.shape().isRequired,
};
