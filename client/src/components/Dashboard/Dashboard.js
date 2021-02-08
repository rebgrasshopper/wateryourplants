import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import styles from './Dashboard.module.css';
import GardenList from "../GardenList/GardenList";
import weatherProvider from '../../providers/weatherProvider';
import userProvider from "../../providers/userProvider";



function Dashboard () {


  const weather = useContext(weatherProvider);
  const user = useContext(userProvider);

  useEffect(()=>{
    console.log("Broadcasting Current User:", user.DBUser);
  }, [user.DBUser])

  return (
  <section className={styles.Dashboard} data-testid="Dashboard">
    <header><h1>Garden Dashboard</h1></header>
      {user.DBUser && <GardenList
      //  gardens={user.DBUser.gardens} user={{userName:user.DBUser.userName, userId:user.DBUser.userAuthId}}
       />}
  </section>
  )

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
