import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userLogo from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';

function Header(props) {
  const [visible, setVisible] = useState(false);
  function visibleBtn() {
    setVisible((prevState) => !prevState);
  }
  const { title, search } = props;
  return (
    <header className="Header">
      <div>
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ userLogo } alt="logo do usuario" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        { search !== '' && (
          <button
            type="button"
            onClick={ visibleBtn }
          >
            <img
              data-testid="search-top-btn"
              src={ search }
              alt="icone de pesquisa"
            />
          </button>) }
      </div>
      { visible ? <SearchBar /> : null }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default Header;
