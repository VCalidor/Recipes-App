import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import CategoriesButtons from '../components/CategoriesButtons';
import { mealsCateg, mealsRender } from '../data';
import mealsAPI from '../services/mealsAPI';
import '../css/FoodsAndDrinks.css';

export default function Foods() {
  const { globalFoods, setGlobalFoods } = useContext(MyContext);
  const [categories, setCategories] = useState([]);

  const firstRenderFetch = async () => {
    if (globalFoods.length === 0) {
      setGlobalFoods(await mealsAPI(mealsRender));
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
        { globalFoods && (
          globalFoods.filter((_result, index) => index < magicNumber)
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <RecipeCards
                index={ index }
                title={ strMeal }
                source={ strMealThumb }
                identificador={ idMeal }
                key={ index }
              />
            )))}
      </section>
      <Footer />
    </div>
  );
}
