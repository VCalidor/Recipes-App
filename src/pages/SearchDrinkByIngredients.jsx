import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cocktailsAPI from '../services/cocktailsAPI';
import { drinkIngList } from '../data';
import '../css/FoodAndDrinkIngredients.css';
import MyContext from '../context/MyContext';

export default function SearchDrinkByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSendDrink } = useContext(MyContext);
  const history = useHistory();

  const getIngredients = async () => {
    const magicNumber = 12;
    const response = await cocktailsAPI(drinkIngList);
    const finalResponse = response.map((result) => result.strIngredient1)
      .filter((_result, index) => index < magicNumber);
    setIngredients(finalResponse);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const sendDrinkIngredient = (ingredient) => {
    setSendDrink(ingredient);
    history.push('/drinks');
  };

  return (
    <div className="ingredient-container">
      <Header title="Explore Ingredients" search="" />
      <div className="card-container">
        {
          ingredients.map((ingredient, index) => (
            <button
              className="ingredient-card"
              type="button"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => sendDrinkIngredient(ingredient) }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
                alt={ ingredient }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ingredient}</h3>
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
