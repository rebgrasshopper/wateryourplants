import React from 'react';

const MyContext = React.createContext({
  currentWeather: {},
  historicWeather: {},
  setCurrentWeather: () => { },
  setHistoricWeather: () => { }

});


export default MyContext;