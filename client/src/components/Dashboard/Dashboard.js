import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import calls from "../../utils/API";
import GardenList from "../GardenList/GardenList";


function Dashboard ({ userData, setUserData }) {

  useEffect(()=>{
    console.log(userData);
  }, [userData])

  return (
  <section className={styles.Dashboard} data-testid="Dashboard">
    <header><h1>Garden Dashboard</h1></header>
      {userData && <GardenList gardens={userData.gardens} user={{userName:userData.userName, userId:userData.userAuthId}} setUserData={setUserData}/>}
  </section>
  )

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
