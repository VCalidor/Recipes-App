import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';

export default function NationalitiesFoods() {
  return (
    <>
      <Header title="Explore Nationalities" search={ searchIcon } />
      <Footer />
    </>
  );
}
