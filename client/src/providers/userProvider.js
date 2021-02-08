import React from 'react';

const MyContext = React.createContext({
    DBUser: {},
    authUserId: {},
    setUser: () => {}
});


export default MyContext;