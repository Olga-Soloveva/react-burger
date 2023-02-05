import React from 'react';
import styles from "./app.module.css";
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import data from '../../utils/data';

function App() {
  return (
    <div className={styles.page}>
      <AppHeader/>
      <MainContent ingredients={data} components={data}/>
    </div>
  );
}

export default App;
