import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinksRandom } from '../data';

export default function SearchDrinks() {
  const history = useHistory();

  const toDrinksIngredients = () => {
    history.push('/explore/drinks/ingredients');
  };

  const surpriseMeDrink = async () => {
    const result = await cocktailsAPI(drinksRandom);
    history.push(`/drinks/${result}`);
  };

  return (
    <>
      <Header title="Explore Drinks" search="" />
      <div>
        <button
          onClick={ toDrinksIngredients }
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
        <button
          onClick={ surpriseMeDrink }
          data-testid="explore-surprise"
          type="button"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}
