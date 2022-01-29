import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/MyContext';
import RecipeCards from '../components/RecipeCards';

export default function Drinks() {
  const magicNumber = 12;
  const { resultsAPI } = useContext(MyContext);
  const newResults = resultsAPI.filter((_result, index) => index < magicNumber);

  return (
    <div>
      <Header title="Drinks" search={ searchIcon } />
      { newResults.map(({ strDrink, strDrinkThumb }, index) => (
        <RecipeCards
          index={ index }
          title={ strDrink }
          source={ strDrinkThumb }
          key={ index }
        />
      ))}
      <Footer />
    </div>
  );
}
