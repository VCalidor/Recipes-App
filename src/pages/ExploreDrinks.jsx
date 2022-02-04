import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinksRandom } from '../data';
import exploreFood from '../images/explorefood.png';
import '../css/ExploreFoodsAndDrinks.css';

export default function SearchDrinks() {
  const history = useHistory();
  const [random, setRandom] = useState([]);

  const getRandom = async () => setRandom(await cocktailsAPI(drinksRandom));

  useEffect(() => {
    getRandom();
  }, []);

  const toDrinksIngredients = () => {
    history.push('/explore/drinks/ingredients');
  };

  const surpriseMeDrink = async () => {
    history.push(`/drinks/${random[0].idDrink}`);
  };

  return (
    <div className="main-container">
      <Header title="Explore Drinks" search="" />
      <div className="button-container">
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
      <img className="image" src={ exploreFood } alt="explore food" />
      <Footer />
    </div>
  );
}
