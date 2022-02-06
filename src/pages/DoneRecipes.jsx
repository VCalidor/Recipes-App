import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export default function DoneRecipes() {
  const [recipes, getRecipes] = useState([]);

  useEffect(() => {
    getRecipes(doneRecipes);
    console.log(recipes);
  }, [recipes]);

  return (
    <div>
      <Header title="Done Recipes" search="" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        className="CategoriesButtons"
      >
        <p>All</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        className="CategoriesButtons"
      >
        <p>Food</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        className="CategoriesButtons"
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
        }, index) => (
          <div key={ index }>
            <img
              src={ image }
              data-testid={ `${index}-horizontal-image` }
              alt={ `${name} recipe` }
              style={ { height: '200px' } }
            />
            <h5>
              {category}
            </h5>
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {name}
            </h1>
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
              tags.slice(0, 2).map((tagName, i) => (
                <span
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                  key={ i }
                >
                  {`${tagName} `}
                </span>
              ))
            }
            <div className="favorite-and-share">
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt={ `share ${name} recipe` }
                />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}
