import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import CategoriesButtons from '../components/CategoriesButtons';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinksCateg, drinksRender } from '../data';

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
    <div>
      <Header title="Drinks" search={ searchIcon } />
      {categories.map(({ strCategory }, index) => (
        <CategoriesButtons index={ index } key={ index } category={ strCategory } />
      ))}
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
      <Footer />
    </div>
  );
}
