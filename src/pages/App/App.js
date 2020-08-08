import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import AppStyles from './App.module.css'
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import CreateAccountPage from '../CreateAccountPage/CreateAccountPage';

function App() {
  return (
    <div className={AppStyles.App}>
      <Header />
      <div className={AppStyles.displayContainer}>
        <Switch>
          <Route path="/login" render={(props) => <LoginPage />} />
          <Route path="/createaccount" render={(props) => <CreateAccountPage />} />
          <Route path="/" render={(props) => <HomePage />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
