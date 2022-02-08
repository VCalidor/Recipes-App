import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mealsAPI from '../services/mealsAPI';
import { mealsIngList } from '../data';
import '../css/FoodAndDrinkIngredients.css';
import MyContext from '../context/MyContext';

export default function SearchFoodByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSendFood } = useContext(MyContext);
  const history = useHistory();

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

  const teste = (ingredient) => {
    setSendFood(ingredient);
    history.push('/foods');
  };

  return (
    <div className="ingredient-container">
      <Header title="Explore Ingredients" search="" />
      <div className="card-container">
        {
          ingredients.map((ingredient, index) => (
            <button
              type="button"
              className="ingredient-card"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => teste(ingredient) }
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
