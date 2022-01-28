import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();

  const toFavoritesRecipes = () => {
    history.push('/favorite-recipes');
  };

  const toDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const logOutFunction = () => {
    localStorage.clear();
    history.push('/');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Header title="Profile" search="" />
      { user && (
        <h1 data-testid="profile-email">{ user.email }</h1>
      ) }
      <section>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ toDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ toFavoritesRecipes }
        >
          Favorite Recipes
        </button>
        <button
          onClick={ logOutFunction }
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}
