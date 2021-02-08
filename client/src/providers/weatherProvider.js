import React from 'react';

const MyContext = React.createContext({
    currentWeather: {},
    historicalWeather: {},
  setWeather: () => {}
});


export default MyContext;