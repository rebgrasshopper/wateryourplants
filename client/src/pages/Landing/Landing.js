import React from 'react';
import PropTypes from 'prop-types';
import styles from './Landing.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';

const Landing = () => (
  <div className={styles.Landing} data-testid="Landing">
    <Dashboard />
  </div>
);

Landing.propTypes = {};

Landing.defaultProps = {};

export default Landing;
