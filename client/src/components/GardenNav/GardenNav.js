import React from 'react';
import styles from './GardenNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SearchResults from "../SearchResults/SearchResults";

function GardenNav({ garden, onInputChange, onSearchSubmit, addMenu, onAddPlantPress, onAddMenuCancel, searchResults, searchError, currentPlant, setCurrentPlant, currentPlantDetails, setCurrentPlantDetails, search, addPlantToGarden }) {
  return (
    <nav className={styles.GardenNav} data-testid="GardenNav">

      <header>
        <h1>{garden ? garden.gardenName : 'Loading Garden'}</h1>
      </header>
      <ul className={addMenu ? styles.SquareBottom : undefined}>
        <li onClick={onAddPlantPress}><FontAwesomeIcon className={styles.plus} icon={faPlusCircle} />Add Plant</li>
      </ul>
      <div className={styles.addMenu} style={addMenu ? { display: "block" } : { display: "none" }}>
        <form onReset={onAddMenuCancel} onSubmit={onSearchSubmit} onChange={onInputChange}>
          <div className={styles.SearchDiv}>
            <label htmlFor="plantSearch">Search</label>
            <input name="plantSearch" id="plantSearch"></input>
          </div>
          <div className={styles.ButtonDiv}>
            <button type="reset">Cancel</button>
            <button type="submit">Search</button>
          </div>
        </form>
        {search.searching || searchResults.length > 0 ?
        <article className={styles.SearchResultsDiv} style={search.searching & searchResults.length === 0 ? {alignItems:"center"} : {alignItems:"stretch"}}>
          {/* loading dots */}
          {searchResults.length === 0 ? 
          <div className={styles.loadingioSpinnerEllipsis}><div className={styles.ldio}>
            <div></div><div></div><div></div><div></div><div></div>
          </div></div>
          : undefined}
          {/* search results */}
          {searchResults && <SearchResults
            searchResults={searchResults}
            currentPlant={currentPlant}
            setCurrentPlant={setCurrentPlant}
            currentPlantDetails={currentPlantDetails}
            setCurrentPlantDetails={setCurrentPlantDetails}
            addPlantToGarden={addPlantToGarden}
          />}
          {searchError && <div className={styles.SearchError}>Please enter search text!</div>}
        </article>
        : undefined}
      </div>
    </nav>
  );
}

GardenNav.propTypes = {};

GardenNav.defaultProps = {};

export default GardenNav;
