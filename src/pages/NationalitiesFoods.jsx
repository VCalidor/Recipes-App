import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import mealsAPI from '../services/mealsAPI';
import { mealsDrop, mealsNatio, mealsRender } from '../data';

export default function NationalitiesFoods() {
  const [dropDown, setDropDown] = useState([]);
  const [country, setCountry] = useState('');
  const [nationalityFood, setNationalityFood] = useState([{}]);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const getDropDown = async () => {
    const response = await mealsAPI(mealsDrop);
    const newDropDown = ['All'];
    const finalResponse = newDropDown.concat(response);

    setDropDown(finalResponse);
  };

  const getCountryMeals = async (parameter) => {
    const magicNumber = 12;
    let response = '';

    if (parameter === '' || parameter === 'All') {
      response = await mealsAPI(mealsRender);
      setNationalityFood(response.filter((_result, index) => index < magicNumber));
    } else {
      response = await mealsAPI(mealsNatio, parameter);
      setNationalityFood(response.filter((_result, index) => index < magicNumber));
    }
  };

  useEffect(() => {
    getDropDown();
  }, []);

  useEffect(() => {
    getCountryMeals(country);
  }, [country]);

  return (
    <>
      <Header title="Explore Nationalities" search={ searchIcon } />
      <div>
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
        >
          {
            dropDown.map((item, index) => (
              <option
                value={ item }
                key={ index }
                data-testid={ `${item}-option` }
              >
                {item}
              </option>
            ))
          }
        </select>
      </div>
      <div>
        { nationalityFood.map(({ strMeal, strMealThumb, idMeal }, i) => (
          <RecipeCards
            index={ i }
            title={ strMeal }
            source={ strMealThumb }
            identificador={ idMeal }
            key={ i }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
