import React from 'react';
import PropTypes from 'prop-types';
import styles from './GardenNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SearchResults from "../SearchResults/SearchResults";

function GardenNav({ garden, onInputChange, onSearchSubmit, addMenu, onAddPlantPress, onAddMenuCancel, searchResults, searchError }) {
return (
  <nav className={styles.GardenNav} data-testid="GardenNav">

    <div>
      <h1>{garden ? garden.gardenName : 'Loading Garden'}</h1>
    </div>
    <ul className={addMenu ? styles.SquareBottom : undefined}>
      <li onClick={onAddPlantPress}><FontAwesomeIcon className={styles.plus} icon={faPlusCircle} />Add Plant</li>
    </ul>
    <div className={styles.addMenu} style={addMenu ? { display: "block" } : { display: "none" }}>
      <form onReset={onAddMenuCancel} onSubmit={onSearchSubmit} onChange={onInputChange}>
        <label htmlFor="plantSearch">Search</label>
        <input name="plantSearch"></input>
        <fieldset>
          <input type="radio" name="searchParam" value="common_name" defaultChecked />Common Name
            <input type="radio" name="searchParam" value="scientific_name" />Scientific Name
          </fieldset>
        <div className={styles.ButtonDiv}>
          <button type="reset">Cancel</button>
          <button type="submit">Search</button>
        </div>
      </form>
        {searchResults && <SearchResults searchResults={searchResults} />}
        {searchError && <div className={styles.SearchError}>Please enter search text!</div>}
    </div>
  </nav>
);
}

GardenNav.propTypes = {};

GardenNav.defaultProps = {};

export default GardenNav;
