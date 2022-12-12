import React from 'react';
import Grid from '@material-ui/core/Grid';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <div className="with-sidebar">
        <Sidebar />
        <Routes />
      </div>
    </div>
  );
};

export default App;
