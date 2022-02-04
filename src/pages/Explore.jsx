import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';
import exploreImage from '../images/explore.png';

export default function Explore() {
  const history = useHistory();

  const toFoodPage = () => {
    history.push('/explore/foods');
  };

  const toDrinkPage = () => {
    history.push('/explore/drinks');
  };

  return (
    <div className="Explore">
      <Header title="Explore" search="" />
      <section>
        <button
          onClick={ toFoodPage }
          data-testid="explore-foods"
          type="button"
        >
          <div className="liquid">{}</div>
          <span>Explore Foods</span>
        </button>
        <button
          onClick={ toDrinkPage }
          data-testid="explore-drinks"
          type="button"
        >
          Explore Drinks
        </button>
      </section>
      <img className="image" src={ exploreImage } alt="explore page" />
      <Footer />
    </div>
  );
}
