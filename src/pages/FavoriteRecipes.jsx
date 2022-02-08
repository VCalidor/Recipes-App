import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import MyContext from '../context/MyContext';
import { setLocalIterable } from '../services/helpers';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [visible, setVisible] = useState(false);
  const [recipes, getRecipes] = useState([]);
  const { favorites, setFavorites } = useContext(MyContext);

  const shareAlert = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const removeFavorite = (id) => {
    const filteredFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(filteredFavorites);
    setLocalIterable('favoriteRecipes', filteredFavorites);
  };

  const filterFood = () => {
    const foods = favorites.filter((meal) => meal.type === 'food');
    getRecipes(foods);
  };

  const filterDrink = () => {
    const drinks = favorites.filter((meal) => meal.type === 'drink');
    getRecipes(drinks);
  };

  const filterAll = () => {
    getRecipes(favorites);
  };

  useEffect(() => {
    filterAll();
  }, [favorites]);

  return (
    <div>
      <Header title="Favorite Recipes" search="" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        className="CategoriesButtons"
        onClick={ filterAll }
      >
        <p>All</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        className="CategoriesButtons"
        onClick={ filterFood }
      >
        <p>Foods</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        className="CategoriesButtons"
        onClick={ filterDrink }
      >
        <p>Drinks</p>
      </button>
      <div>
        {
          recipes.map(({
            id,
            type,
            nationality,
            category,
            name,
            image,
            alcoholicOrNot,
          }, index) => (
            <div key={ index }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt="imagem"
                  style={ { height: '200px' } }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h3 data-testid={ `${index}-horizontal-name` }>
                  { name }
                </h3>
                {
                  type === 'food' ? (
                    <h3 data-testid={ `${index}-horizontal-top-text` }>
                      { `${nationality} - ${category}` }
                    </h3>
                  ) : (
                    <h3 data-testid={ `${index}-horizontal-top-text` }>
                      { alcoholicOrNot }
                    </h3>
                  )
                }
              </Link>
              <button
                type="button"
                onClick={ () => shareAlert(type, id) }
              >
                <img
                  src={ shareIcon }
                  alt="imag"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              { visible === true && (
                <p>Link copied!</p>
              )}
              <button
                type="button"
                onClick={ () => removeFavorite(id) }

              >
                <img
                  src={ blackHeart }
                  alt="imag"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
