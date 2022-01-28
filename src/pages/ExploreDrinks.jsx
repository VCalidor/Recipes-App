import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchDrinks() {
  const history = useHistory();

  const toDrinksIngredients = () => {
    history.push('/explore/drinks/ingredients');
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
        <button data-testid="explore-surprise" type="button">Surprise me!</button>
      </div>
      <Footer />
    </>
  );
}
