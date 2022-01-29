export const mealsFirstLetterFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${parameter}`;

  const { meals } = await fetch(endPoint).then((response) => response.json());
  console.log(meals);

  if (meals) {
    return meals;
  } return [];
};

export const mealsIngredientFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parameter}`;

  const { meals } = await fetch(endPoint).then((response) => response.json());
  console.log(meals);

  if (meals) {
    return meals;
  } return [];
};

export const mealsNameFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${parameter}`;

  const { meals } = await fetch(endPoint).then((response) => response.json());
  console.log(meals);

  if (meals) {
    return meals;
  } return [];
};

export const cocktailsFirstLetterFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${parameter}`;

  const { drinks } = await fetch(endPoint).then((response) => response.json());
  console.log(drinks);

  if (drinks) {
    return drinks;
  } return [];
};

export const cocktailsIngredientFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${parameter}`;

  const { drinks } = await fetch(endPoint).then((response) => response.json());
  console.log(drinks);

  if (drinks) {
    return drinks;
  } return [];
};

export const cocktailsNameFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${parameter}`;

  const { drinks } = await fetch(endPoint).then((response) => response.json());

  if (drinks) {
    return drinks;
  } return [];
};
