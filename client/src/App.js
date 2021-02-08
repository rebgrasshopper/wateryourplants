import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './pages/Landing/Landing';
import DetailView from './pages/DetailView/DetailView';
import { BrowserRouter, Route } from "react-router-dom";
import gardenCalls from "./utils/API";
import weatherProvider from "./providers/weatherProvider";
import userProvider from "./providers/userProvider";


let i = 0;

function App() {


  //set up weather and user contexts
  const [weatherData, setWeatherData] = useState({
    currentWeather: {},
    historicWeather: {},
    setCurrentWeather: (data) => {
      setWeatherData({ ...weatherData, currentWeather: data })
    },
    setHistoricWeather: (data) => {
      setWeatherData({ ...weatherData, historicWeather: data })
    }
  });

  const [userData, setUserData] = useState({
    DBUser: {},
    authUserId: {},
    setUser: (data) => {
      setUserData({ ...userData, DBUser: data });
    }
  });

  //populate weather and user contexts
  useEffect(() => {
    gardenCalls.getUserData({ userAuthId: "kasdkf8923u23" }).then(data => {
      // console.log(i, "setting user data");
      // console.log("current", userData)
      // console.log(weatherData);
      setUserData({
        ...userData,
        DBUser: data
      });

      gardenCalls.getCurrentWeather({ cityName: "San Diego" }).then(data => {
        // console.log(i, "setting weather data")
        // console.log("current", userData)
        // console.log(weatherData);
        setWeatherData({
          ...weatherData,
          currentWeather: data
        })
      })
    })
    i++;
  }, [])


  if (userData) {
    // console.log("data:", userData, weatherData)
    return (
      <BrowserRouter>
        <userProvider.Provider value={userData}>
          <weatherProvider.Provider value={weatherData}>
            <Route exact path="/" render={(props) => <Landing />} />
            <Route path="/garden/:id" render={(props) => <DetailView />} />
          </weatherProvider.Provider>
        </userProvider.Provider>
      </BrowserRouter>
    );
  } else {
    return (
      <p>Please wait while we load your garden!</p>
    )
  }
}

export default App;
