import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mealsAPI from '../services/mealsAPI';
import { mealsRandom } from '../data';
import exploreDrink from '../images/exploredrink.png';
import '../css/ExploreFoodsAndDrinks.css';

export default function SearchFoods() {
  const history = useHistory();
  const [random, setRandom] = useState([]);

  const getRandom = async () => setRandom(await mealsAPI(mealsRandom));

  useEffect(() => {
    getRandom();
  }, []);

  const toFoodIngredients = () => {
    history.push('/explore/foods/ingredients');
  };

  const toNacionalityPage = () => {
    history.push('/explore/foods/nationalities');
  };

  const surpriseMeFood = async () => {
    history.push(`/foods/${random[0].idMeal}`);
  };
  return (
    <div className="main-container">
      <Header title="Explore Foods" search="" />
      <div className="button-container">
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
        <button
          onClick={ surpriseMeFood }
          data-testid="explore-surprise"
          type="button"
        >
          Surprise me!
        </button>
      </div>
      <img className="image" src={ exploreDrink } alt="explore drink" />
      <Footer />
    </div>
  );
}
