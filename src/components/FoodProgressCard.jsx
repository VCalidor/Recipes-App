import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../css/Details.css';
import IngredientsProgress from './IngredientsProgress';
import MyContext from '../context/MyContext';
import { getData, setLocalIterable } from '../services/helpers';

const copy = require('clipboard-copy');

const magicNumber = 33;

export default function FoodProgressCard({ details }) {
  const {
    image, title, newObj,
    category, instructions,
    video, alcoholic, identi,
    type, nationality, tags,
  } = details;
  const [visible, setVisible] = useState(false);

  const [inProgress, setInProgress] = useState(JSON
    .parse(localStorage
      .getItem('inProgressRecipes')).meals[identi] || []);

  const { setFavorites,
    favorites, checkFavorites, setDoneRecipes, doneRecipes } = useContext(MyContext);

  const history = useHistory();

  const shareAlert = () => {
    copy(window.location.href.slice(0, magicNumber));
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const toggleFavorites = () => {
    const newFavorite = {
      id: identi,
      name: title,
      image,
      category,
      alcoholicOrNot: alcoholic,
      type,
      nationality,
    };
    if (!checkFavorites(identi)) {
      setFavorites(favorites.concat(newFavorite));
      setLocalIterable('favoriteRecipes', favorites.concat(newFavorite));
    } else {
      const filteredFavorites = favorites.filter((favorite) => favorite.id !== identi);
      setFavorites(filteredFavorites);
      setLocalIterable('favoriteRecipes', filteredFavorites);
    }
  };

  const finishRecipeBtn = () => {
    const obj = {
      id: identi,
      name: title,
      image,
      category,
      alcoholicOrNot: alcoholic,
      type,
      nationality: '',
      doneDate: getData(),
      tags,
    };
    setDoneRecipes(doneRecipes.concat(obj));
    setLocalIterable('doneRecipes', [...doneRecipes, obj]);
    console.log(tags);
    history.push('/done-recipes');
  };

  useEffect(() => {
    const locStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
    locStore.meals[identi] = inProgress;
    localStorage.setItem('inProgressRecipes', JSON.stringify(locStore));
  }, [inProgress]);

  return (
    <div className="Details">
      <img className="main-image" data-testid="recipe-photo" src={ image } alt="food" />
      <h2 data-testid="recipe-title">{title}</h2>
      <section data-testid="recipe-category">
        {
          alcoholic ? <h4>{`${alcoholic} ${category} `}</h4> : <h4>{ category }</h4>
        }
      </section>
      <div className="favorite-and-share">
        <button
          onClick={ shareAlert }
          data-testid="share-btn"
          type="button"
        >
          <img src={ shareIcon } alt="share" />
        </button>
        { visible === true && (
          <p>Link copied!</p>
        ) }
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ toggleFavorites }
          src={ checkFavorites(identi) ? blackHeart : whiteHeart }
        >
          <img src={ checkFavorites(identi) ? blackHeart : whiteHeart } alt="favorite" />
        </button>
      </div>
      <section className="ingredient-list">
        <ul>
          { newObj.ing.length > 0 && (
            newObj.ing.map((ingr, index) => (
              <li
                data-testid={ `${index}-ingredient-step` }
                key={ index }
              >
                <IngredientsProgress
                  ingr={ ingr }
                  index={ index }
                  newObj={ newObj }
                  inProgress={ inProgress }
                  setInProgress={ setInProgress }
                />
              </li>
            ))
          )}
        </ul>
      </section>
      <p data-testid="instructions">{ instructions }</p>
      { video && (
        <iframe
          src={ video.replace('watch?v=', 'embed/') }
          allowFullScreen
          title="video"
          data-testid="video"
        />
      )}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="start-recipe"
        disabled={ newObj.ing.length !== inProgress.length }
        onClick={ finishRecipeBtn }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

FoodProgressCard.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    newObj: PropTypes.shape({
      ing: PropTypes.arrayOf(PropTypes.string),
      measure: PropTypes.arrayOf(PropTypes.string),
      rec: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    category: PropTypes.string,
    instructions: PropTypes.string.isRequired,
    video: PropTypes.string,
    reco: PropTypes.arrayOf(PropTypes.object).isRequired,
    identi: PropTypes.string.isRequired,
    alcoholic: PropTypes.string,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

FoodProgressCard.defaultProps = {
  details: PropTypes.shape({
    category: null,
    video: null,
    alcoholic: '',
    nationality: '',
    tags: [],
  }),
};
