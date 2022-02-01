import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import { mealsFirstRender, mealsCategoriesFetch } from '../services';
import CategoriesButtons from '../components/CategoriesButtons';

export default function Foods() {
  const { resultsAPI, setResultsAPI } = useContext(MyContext);
  const [categories, setCategories] = useState([]);

  const firstRenderFetch = async () => {
    // Funcao para setar no resultsAPI as primeiras meals
    setResultsAPI(await mealsFirstRender());
    setCategories(await mealsCategoriesFetch());
  };

  useEffect(() => {
    firstRenderFetch();
  }, []);

  const magicNumber = 12;
  const newResults = resultsAPI.filter((_result, index) => index < magicNumber);

  return (
    <div>
      <Header title="Foods" search={ searchIcon } />
      { categories.map(({ strCategory }, index) => (
        <CategoriesButtons
          index={ index }
          key={ index }
          category={ strCategory }
        />
      ))}
      { newResults.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <RecipeCards
          index={ index }
          title={ strMeal }
          source={ strMealThumb }
          idMeal={ idMeal }
          key={ index }
        />
      ))}
      <Footer />
    </div>
  );
}
