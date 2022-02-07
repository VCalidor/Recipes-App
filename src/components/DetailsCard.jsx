import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../css/Details.css';
import MyContext from '../context/MyContext';
import IngredientList from './ingredientList';
import RecomendCard from './RecomendCard';
import { setLocalIterable } from '../services/helpers';

const copy = require('clipboard-copy');

export default function DetailsCard({ details }) {
  const {
    image, title, newObj,
    category, instructions,
    video, reco, identi, alcoholic, type, nationality, kind,
  } = details;
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const { setFavorites, favorites, checkFavorites, inProgress } = useContext(MyContext);

  const shareAlert = () => {
    copy(window.location.href);
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

  const startRecipe = () => {
    if (window.location.href === `http://localhost:3000/foods/${identi}`) {
      history.push(`/foods/${identi}/in-progress`);
    } else {
      history.push(`/drinks/${identi}/in-progress`);
    }
  };

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
      <IngredientList newObj={ newObj } />
      <p data-testid="instructions">{ instructions }</p>
      { video && (
        <iframe
          src={ video.replace('watch?v=', 'embed/') }
          allowFullScreen
          title="video"
          data-testid="video"
        />
      )}
      <section>
        <h2>
          Recomendation
        </h2>
        <RecomendCard reco={ reco } />
      </section>
      <button
        className="start-recipe"
        onClick={ startRecipe }
        data-testid="start-recipe-btn"
        type="button"
      >
        {
          Object.keys(inProgress[kind]).includes(identi) ? (
            'Continue Recipe') : 'Start Recipe'
        }
      </button>
    </div>
  );
}

DetailsCard.propTypes = {
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
    kind: PropTypes.string.isRequired,
  }),
};

DetailsCard.defaultProps = {
  details: PropTypes.shape({
    category: null,
    video: null,
    alcoholic: null,
    nationality: '',
  }),
};
