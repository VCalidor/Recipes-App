import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchFoods() {
  const history = useHistory();

  const toFoodIngredients = () => {
    history.push('/explore/foods/ingredients');
  };

  const toNacionalityPage = () => {
    history.push('/explore/foods/nationalities');
  };

  return (
    <>
      <Header title="Explore Foods" search="" />
      <div>
        <button
          onClick={ toFoodIngredients }
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
        <button
          onClick={ toNacionalityPage }
          data-testid="explore-by-nationality"
          type="button"
        >
          By Nationality
        </button>
        <button data-testid="explore-surprise" type="button">Surprise me!</button>
      </div>
      <Footer />
    </>
  );
}
