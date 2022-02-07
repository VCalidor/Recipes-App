import React from 'react';
import PropTypes, { objectOf } from 'prop-types';

function RecomendCard({ reco }) {
  return (
    <div className="recomend-box">
      {
        reco[0].strDrink && (
          reco.map((rec, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="recomend-card"
            >
              <img src={ rec.strDrinkThumb } alt="recomendation" />
              <h4>{rec.strAlcoholic}</h4>
              <h4>{rec.strDrink}</h4>
            </div>
          ))
        )
      }
      {
        reco[0].strMeal && (
          reco.map((rec, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="recomend-card"
            >
              <img src={ rec.strMealThumb } alt="recomendation" />
              <h4>{rec.strMeal}</h4>
            </div>
          ))
        )
      }
    </div>
  );
}

RecomendCard.propTypes = {
  reco: PropTypes.arrayOf(objectOf(PropTypes.string)).isRequired,
};
export default RecomendCard;
