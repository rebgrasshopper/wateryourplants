import React from 'react';
import styles from './Landing.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';

function Landing () {
  return (
  <div className={styles.Landing} data-testid="Landing">
    <Dashboard />
  </div>
  )
};

Landing.propTypes = {};

Landing.defaultProps = {};

export default Landing;
