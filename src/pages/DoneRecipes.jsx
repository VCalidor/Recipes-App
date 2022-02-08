import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [recipes, getRecipes] = useState([]);
  const [visible, setVisible] = useState(false);
  const { doneRecipes } = useContext(MyContext);

  const filterFood = () => {
    const foods = doneRecipes.filter((meal) => meal.type === 'food');
    getRecipes(foods);
  };

  const shareAlert = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const filterDrink = () => {
    const drinks = doneRecipes.filter((meal) => meal.type === 'drink');
    getRecipes(drinks);
  };

  const filterAll = () => {
    getRecipes(doneRecipes);
  };

  useEffect(() => {
    filterAll();
  }, []);

  return (
    <div>
      <Header title="Done Recipes" search="" />
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
      {
        recipes.map(({
          category,
          image,
          name,
          doneDate,
          tags,
          type,
          nationality,
          alcoholicOrNot,
          id,
        }, index) => (
          <div key={ index }>

            <Link to={ `/${type}s/${id}` }>
              <img
                src={ image }
                data-testid={ `${index}-horizontal-image` }
                alt={ `${name} recipe` }
                style={ { height: '200px' } }
              />
              <h5>
                {category}
              </h5>
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {name}
              </h2>
              <h4
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Done in: ${doneDate}`}
              </h4>
              { type === 'food' ? (
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  { `${nationality} - ${category}` }
                </h5>
              ) : (
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  { alcoholicOrNot }
                </h5>
              ) }
              {
                tags ? (
                  tags.map((tagName, i) => (
                    <span
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                      key={ i }
                    >
                      {`${tagName} `}
                    </span>
                  ))
                ) : (
                  <span
                    data-testid={ `${0}-${tags}-horizontal-tag` }
                  >
                    { tags }
                  </span>
                )
              }
            </Link>
            <div>
              <div className="favorite-and-share">
                <button
                  type="button"
                  onClick={ () => shareAlert(type, id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ `share ${name} recipe` }
                  />
                </button>
                { visible === true && (
                  <p>Link copied!</p>
                )}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
