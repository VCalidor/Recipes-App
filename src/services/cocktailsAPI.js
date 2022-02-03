import {
  drinksCateg,
  drinksCategRecipe,
  drinksFirstLetter,
  drinksIng,
  drinksName,
} from '../data';

const five = 5;
const doze = 12;
const alertString = 'Sorry, we haven\'t found any recipes for these filters.';

const cocktailsAPI = async (endpoint, parameter = '') => {
  const { drinks } = await fetch(endpoint + parameter)
    .then((response) => response.json());
  switch (endpoint) {
  case drinksCateg:
    return drinks.filter((_meal, index) => index < five);
  case drinksCategRecipe:
    return drinks.filter((_meal, index) => index < doze);
  case drinksFirstLetter:
  case drinksIng:
  case drinksName:
    console.log(drinks);
    if (!drinks) {
      global.alert(alertString);
      return [];
    } return drinks;
  default:
    return drinks;
  }
};

export default cocktailsAPI;
