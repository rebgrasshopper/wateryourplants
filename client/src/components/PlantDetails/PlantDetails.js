import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlantDetails.module.css';

const PlantDetails = () => (
  <div className={styles.PlantDetails} data-testid="PlantDetails">
    PlantDetails Component
  </div>
);

PlantDetails.propTypes = {};

PlantDetails.defaultProps = {};

export default PlantDetails;
