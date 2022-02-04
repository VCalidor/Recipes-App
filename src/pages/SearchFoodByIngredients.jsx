import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mealsAPI from '../services/mealsAPI';
import { mealsIngList } from '../data';
import '../css/FoodAndDrinkIngredients.css';

export default function SearchFoodByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const magicNumber = 12;
    const response = await mealsAPI(mealsIngList);
    const finalResponse = response.map((result) => result.strIngredient)
      .filter((_result, index) => index < magicNumber);
    setIngredients(finalResponse);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className="ingredient-container">
      <Header title="Explore Ingredients" search="" />
      <div className="card-container">
        {
          ingredients.map((ingredient, index) => (
            <button
              className="ingredient-card"
              type="button"
              value={ ingredient }
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
                alt={ ingredient }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ ingredient }</h3>
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
