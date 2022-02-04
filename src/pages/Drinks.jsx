import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import CategoriesButtons from '../components/CategoriesButtons';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinksCateg, drinksRender } from '../data';
import '../css/FoodsAndDrinks.css';

export default function Drinks() {
  const { globalDrinks, setGlobalDrinks } = useContext(MyContext);
  const [categories, setCategories] = useState([]);

  const firstRenderFetch = async () => {
    if (globalDrinks.length === 0) {
      setGlobalDrinks(await cocktailsAPI(drinksRender));
    }
    setCategories([{ strCategory: 'All' }].concat(await cocktailsAPI(drinksCateg)));
  };

  useEffect(() => {
    firstRenderFetch();
  }, []);

  const magicNumber = 12;

  return (
    <div className="main-content">
      <Header title="Drinks" search={ searchIcon } />
      <section className="category-list">
        {categories.map(({ strCategory }, index) => (
          <CategoriesButtons index={ index } key={ index } category={ strCategory } />
        ))}
      </section>
      <section className="card-list">
        {globalDrinks && (
          globalDrinks.filter((_result, index) => index < magicNumber)
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <RecipeCards
                index={ index }
                title={ strDrink }
                source={ strDrinkThumb }
                identificador={ idDrink }
                key={ index }
              />
            )))}
      </section>
      <Footer />
    </div>
  );
}
