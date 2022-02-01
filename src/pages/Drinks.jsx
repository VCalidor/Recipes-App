import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import { cocktailsFirstRender, cocktailsCategoriesFetch } from '../services';
import CategoriesButtons from '../components/CategoriesButtons';

export default function Drinks() {
  const { resultsAPI, setResultsAPI } = useContext(MyContext);
  const [categories, setCategories] = useState([]);

  const firstRenderFetch = async () => {
    // Funcao para setar no resultsAPI os primeiros drinks
    setResultsAPI(await cocktailsFirstRender());
    setCategories(await cocktailsCategoriesFetch());
  };

  useEffect(() => {
    firstRenderFetch();
  }, []);

  const magicNumber = 12;
  const newResults = resultsAPI.filter((_result, index) => index < magicNumber);

  return (
    <div>
      <Header title="Drinks" search={ searchIcon } />
      { categories.map(({ strCategory }, index) => (
        <CategoriesButtons
          index={ index }
          key={ index }
          category={ strCategory }
        />
      ))}
      { newResults.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <RecipeCards
          index={ index }
          title={ strDrink }
          source={ strDrinkThumb }
          idDrink={ idDrink }
          key={ index }
        />
      ))}
      <Footer />
    </div>
  );
}
