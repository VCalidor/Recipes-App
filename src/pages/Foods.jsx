import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import CategoriesButtons from '../components/CategoriesButtons';
import { mealsCateg, mealsIng, mealsRender } from '../data';
import mealsAPI from '../services/mealsAPI';
import '../css/FoodsAndDrinks.css';

function Foods() {
  const { globalFoods, setGlobalFoods, sendFood } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [arr, setArr] = useState([]);

  const firstRenderFetch = async () => {
    if (sendFood === '') {
      setGlobalFoods(await mealsAPI(mealsRender));
    } else {
      setArr(await mealsAPI(mealsIng, sendFood));
    }
    setCategories([{ strCategory: 'All' }].concat(await mealsAPI(mealsCateg)));
  };

  useEffect(() => {
    firstRenderFetch();
  }, []);

  const magicNumber = 12;

  return (
    <div className="main-content">
      <Header title="Foods" search={ searchIcon } />
      <section className="category-list">
        { categories.map(({ strCategory }, index) => (
          <CategoriesButtons
            index={ index }
            key={ index }
            category={ strCategory }
          />
        ))}
      </section>
      <section className="card-list">
        {
          sendFood !== '' ? (
            arr.filter((_result, index) => index < magicNumber)
              .map(({ strMeal, strMealThumb, idMeal }, index) => (
                <RecipeCards
                  index={ index }
                  title={ strMeal }
                  source={ strMealThumb }
                  identificador={ idMeal }
                  key={ index }
                />
              ))
          ) : (
            globalFoods.filter((_result, index) => index < magicNumber)
              .map(({ strMeal, idMeal, strMealThumb }, index) => (
                <RecipeCards
                  title={ strMeal }
                  index={ index }
                  source={ strMealThumb }
                  key={ index }
                  identificador={ idMeal }
                />
              ))
          )
        }
      </section>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Foods;
