import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import calls from "../../utils/API";


function Dashboard () {
  const [ userData, setUserData ] = useState();
  console.log("userData:", userData)

  useEffect(()=>{
    calls.getUserData({userAuthId:"kasdkf8923u23"}).then(data=>{
      setUserData(data);
    })
  }, [])

  return (
  <div className={styles.Dashboard} data-testid="Dashboard">
    <header><h1>Garden Dashboard</h1></header>
    <ul>
    {userData && userData.gardens.map(garden => <li>garden</li>)}
    </ul>
  </div>
  )

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
