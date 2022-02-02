const alertString = 'Sorry, we haven\'t found any recipes for these filters.';

export const mealsFirstRender = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(endPoint).then((response) => response.json());
  return meals;
};

export const mealsCategoriesFetch = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(endPoint).then((response) => response.json());
  const five = 5;
  return meals.filter((_meal, index) => index < five);
};

export const mealsCategoriesRecipesFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${parameter}`;

  const { meals } = await fetch(endPoint).then((response) => response.json());

  console.log(meals);
  const doze = 12;
  return meals.filter((_meal, index) => index < doze);
};

export const mealsFirstLetterFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${parameter}`;
  const { meals } = await fetch(endPoint).then((response) => response.json());

  if (!meals) {
    global.alert(alertString);
    return [];
  }
  return meals;
};

export const mealsIngredientFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parameter}`;
  const { meals } = await fetch(endPoint).then((response) => response.json());

  if (!meals) {
    global.alert(alertString);
    return [];
  }
  return meals;
};

export const mealsNameFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${parameter}`;
  const { meals } = await fetch(endPoint).then((response) => response.json());

  if (!meals) {
    global.alert(alertString);
    return [];
  }
  return meals;
};

export const cocktailsFirstRender = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await fetch(endPoint).then((response) => response.json());
  return drinks;
};

export const cocktailsCategoriesFetch = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(endPoint).then((response) => response.json());
  const five = 5;
  return drinks.filter((_meal, index) => index < five);
};

export const cocktailsCategoriesRecipesFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${parameter}`;

  const { drinks } = await fetch(endPoint).then((response) => response.json());

  console.log(drinks);
  const doze = 12;
  return drinks.filter((_meal, index) => index < doze);
};

export const cocktailsFirstLetterFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${parameter}`;
  const { drinks } = await fetch(endPoint).then((response) => response.json());

  if (!drinks) {
    global.alert(alertString);
    return [];
  }
  return drinks;
};

export const cocktailsIngredientFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${parameter}`;
  const { drinks } = await fetch(endPoint).then((response) => response.json());

  if (!drinks) {
    global.alert(alertString);
    return [];
  }
  return drinks;
};

export const cocktailsNameFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${parameter}`;
  const { drinks } = await fetch(endPoint).then((response) => response.json());

  if (!drinks) {
    global.alert(alertString);
    return [];
  }
  return drinks;
};

export const foodDetailsFetch = async (parameter) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${parameter}`;
  const { meals } = await fetch(endPoint).then((response) => response.json());
  return meals;
};

export const drinksDetailsFetch = async (parameter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${parameter}`;
  const { drinks } = await fetch(endPoint).then((response) => response.json());
  return drinks;
};

export const randomMealFetch = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await fetch(endPoint).then((response) => response.json());
  const randomFood = meals[0];
  const idFood = randomFood.idMeal;
  return idFood;
};

export const randomDrinkFetch = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { drinks } = await fetch(endPoint).then((response) => response.json());
  const randomDrinks = drinks[0];
  const idDrinks = randomDrinks.idDrink;
  return idDrinks;
};
