import {
  mealsCateg,
  mealsCategRecipe,
  mealsFirstLetter,
  mealsIng,
  mealsName,
} from '../data';

const five = 5;
const doze = 12;
const alertString = 'Sorry, we haven\'t found any recipes for these filters.';

const mealsAPI = async (endpoint, parameter = '') => {
  const { meals } = await fetch(endpoint + parameter)
    .then((response) => response.json());
  switch (endpoint) {
  case mealsCateg:
    return meals.filter((_meal, index) => index < five);
  case mealsCategRecipe:
    return meals.filter((_meal, index) => index < doze);
  case mealsFirstLetter:
  case mealsIng:
  case mealsName:
    if (!meals) {
      global.alert(alertString);
      return [];
    } return meals;
  default:
    return meals;
  }
};

export default mealsAPI;
