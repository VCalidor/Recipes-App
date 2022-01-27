import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" search={ searchIcon } />
      Drinks
    </div>
  );
}
