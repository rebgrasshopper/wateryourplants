import React from 'react';
import PropTypes from 'prop-types';
import styles from './Landing.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';

function Landing ({userData, setUserData}) {
  return (
  <div className={styles.Landing} data-testid="Landing">
    <Dashboard userData={userData} setUserData={setUserData}/>
  </div>
  )
};

Landing.propTypes = {};

Landing.defaultProps = {};

export default Landing;
