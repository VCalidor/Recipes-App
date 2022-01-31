import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';
import { mealsFirstRender } from '../services';

export default function Foods() {
  const { resultsAPI, setResultsAPI } = useContext(MyContext);

  const firstRenderFetch = async () => {
    setResultsAPI(await mealsFirstRender());
  };

  useEffect(() => {
    firstRenderFetch();
  }, []);

  const magicNumber = 12;
  const newResults = resultsAPI.filter((_result, index) => index < magicNumber);

  return (
    <div>
      <Header title="Foods" search={ searchIcon } />
      { newResults.map(({ strMeal, strMealThumb }, index) => (
        <RecipeCards
          index={ index }
          title={ strMeal }
          source={ strMealThumb }
          key={ index }
        />
      ))}
      <Footer />
    </div>
  );
}
