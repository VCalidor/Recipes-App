import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();

  const toFoodPage = () => {
    history.push('/explore/foods');
  };

  const toDrinkPage = () => {
    history.push('/explore/drinks');
  };

  return (
    <div>
      <Header title="Explore" search="" />
      <div>
        <button
          onClick={ toFoodPage }
          data-testid="explore-foods"
          type="button"
        >
          Explore Foods
        </button>
        <button
          onClick={ toDrinkPage }
          data-testid="explore-drinks"
          type="button"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}
