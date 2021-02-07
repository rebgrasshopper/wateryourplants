import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlantCard.module.css';
import shrub from "./images/draughttolerantshrub.png";

function PlantCard({ plant }) {

  function joinArrayWithFinalOr(anArray) {
    let aString = '';
    if (anArray.length > 2) {
      aString += anArray.slice(0, anArray.length - 1).join(", ")
      aString += `, or ${anArray[anArray.length - 1]}`;
    } else if (anArray.length === 2) {
      aString += anArray.join(" or ");
    } else if (anArray.length === 1) {
      aString = anArray[0];
    } else {
      return false;
    }
    return aString;
  }

  return (
    <div className={styles.PlantCard} data-testid="PlantCard" data-plantid={plant._id}>
      <div className={styles.PlantTitle}>
        <h3>{plant.plant.plantName}</h3>
        <img src={shrub} alt="icon of a draught tolerant shrub" className="plantIcon"></img>
      </div>
      <p>A {plant.plant.category}.</p>
      <p>Water me: {plant.plant.waterNeed}</p>
      <p>I would like {joinArrayWithFinalOr(plant.plant.sunNeed)} sun.</p>
      <p>I'd feel most comfortable in {joinArrayWithFinalOr(plant.plant.soilType)} soil.</p>
    </div>
  )
};

PlantCard.propTypes = {};

PlantCard.defaultProps = {};

export default PlantCard;
