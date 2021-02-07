import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchResults.module.css';
import Plant from "./images/plant.png";
import gardenCalls from "../../utils/API";
const sunRequirements = {0:"dense shade", 1:"dense shade", 2:"full shade", 3:"full shade", 4:"partial shade", 5:"partial shade", 6:"partial sun", 7:"partial sun", 8:"full sun", 9:"full sun", 10:"full sun"};

function SearchResults({ searchResults }) {

  const [currentPlant, setCurrentPlant] = useState();
  const [currentPlantDetails, setCurrentPlantDetails] = useState();

  function buttonClick(event) {
    setCurrentPlant(searchResults.filter(plant => plant.scientific_name === event.target.id)[0])
  }

  useEffect(() => {
    if (currentPlant) {
      gardenCalls.getPlantData({ plantLink: currentPlant.links.plant, scientificName: currentPlant.scientific_name }).then(data => {
        setCurrentPlantDetails(data.data.data);
      });
    }
  }, [currentPlant])

  useEffect(() => {
    console.log("CurrentPlantDetails:")
    console.log(currentPlantDetails);
  }, [currentPlantDetails]);

  function backButtonClick(){
    setCurrentPlantDetails();
    setCurrentPlant();
  }

  function displayPlant() {
    if (currentPlantDetails) {
      return (
        <section className={styles.CurrentPlant}>
          <h1>{currentPlant.common_name}</h1>
          <div className={styles.FamilyName}>{currentPlant.scientific_name}, family {currentPlant.family}</div>
          <hr />
          <div className={styles.CareDetails}>
            <img src={currentPlantDetails.image_url ? currentPlantDetails.image_url : Plant} align="right" alt={currentPlantDetails.common_name} />
            <h3>Care and Growth</h3>
            {currentPlantDetails.main_species.growth.minimum_precipitation.mm && <p>Minimum Precipitation: {(parseInt(currentPlantDetails.main_species.growth.minimum_precipitation.mm)/25.4).toFixed(0)}"/year.</p>}
            {currentPlantDetails.main_species.growth.maximum_precipitation.mm && <p>Maximum Precipitation: {(parseInt(currentPlantDetails.main_species.growth.maximum_precipitation.mm)/25.4).toFixed(0)}"/year.</p>}
            {currentPlantDetails.main_species.growth.minimum_temperature.deg_f && <p>I don't want to be any colder than {currentPlantDetails.main_species.growth.minimum_temperature.deg_f}°F.</p>}
            {currentPlantDetails.main_species.growth.maximum_temperature.deg_f && <p>I'd rather not be any warmer than {currentPlantDetails.main_species.growth.maximum_temperature.deg_f}°F.</p>}
            {currentPlantDetails.main_species.growth.light && <p>I'd like to live in {sunRequirements[currentPlantDetails.main_species.growth.light]}.</p>}
            {!currentPlantDetails.main_species.growth.minimum_precipitation.mm & !currentPlantDetails.main_species.growth.maximum_precipitation.mm & !currentPlantDetails.main_species.growth.minimum_temperature.deg_f & !currentPlantDetails.main_species.growth.maximum_temperature.deg_f & !currentPlantDetails.main_species.growth.light ? <p>We're sorry, there is no plant data at this time! Contact us to let us know, and we'll try to find out about this plant's care!</p> : <p></p>}
          </div>
          <button onClick={backButtonClick}>Back</button>
          <button>Add Plant</button>
        </section>
      )
    }
  }
  return (
    <ul className={styles.SearchResults} data-testid="SearchResults">
      {searchResults.map(plant => {
        return (
          <li className={styles.SearchedPlant} key={plant.scientific_name} id={plant.scientific_name} onClick={buttonClick}>
            <img src={plant.image_url !== null ? plant.image_url : Plant} alt={plant.common_name} />
            <div>
              <h2>{plant.common_name}</h2>
              <div>{plant.scientific_name}</div>
            </div>
          </li>
        )
      })}
      {displayPlant()}
    </ul>
  );
}

SearchResults.propTypes = {};

SearchResults.defaultProps = {};

export default SearchResults;
