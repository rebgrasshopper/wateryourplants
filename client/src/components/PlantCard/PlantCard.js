import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlantCard.module.css';

function PlantCard({plant}) {
  console.log(plant)
  return (
    <div className={styles.PlantCard} data-testid="PlantCard" data-plantid={plant._id}>
      <h3>{plant.plant.plantName}</h3>
    </div>
  )
};

PlantCard.propTypes = {};

PlantCard.defaultProps = {};

export default PlantCard;
