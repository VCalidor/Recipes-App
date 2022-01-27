import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

export default function Foods() {
  return (
    <div>
      <Header title="Foods" search={ searchIcon } />
      Foods
      <Footer />
    </div>
  );
}
