import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import data from '../../utils/data';

function App() {
  return (
    <div className="page">
      <AppHeader/>
      <MainContent ingredients={data} components={data}/>
    </div>
  );
}

export default App;
