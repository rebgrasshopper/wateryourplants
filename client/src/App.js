import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing/Landing';
import DetailView from './pages/DetailView/DetailView';
import { BrowserRouter, Route } from "react-router-dom";
import gardenCalls from "./utils/API";

function App() {

  const [ userData, setUserData ] = useState();

  useEffect(()=>{
    gardenCalls.getUserData({userAuthId:"kasdkf8923u23"}).then(data=>{
      setUserData(data);
    })
  }, [])


  if (userData){
    console.log("data:", userData)
    return (
      <BrowserRouter>
        <Route exact path="/" render={(props)=> <Landing userData={userData} setUserData={setUserData} />}/>
        <Route path="/garden/:id" render={(props) => <DetailView userData={userData} setUserData={setUserData} {...props}/>} />
      </BrowserRouter>
    );
  } else {
    return (
      <p>Please wait while we load your garden!</p>
    )
  }
}

export default App;
